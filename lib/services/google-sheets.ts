import { google } from 'googleapis'
import { createClient } from '@supabase/supabase-js'

export interface OrderSheetPayload {
  orderId: string
  createdAt?: string | Date
  serviceType: string
  title: string
  creativeType?: string | null
  brief: string
  copyContent?: string | null
  needContentHelp?: string | null
  assetFiles?: string[]
  assetLink?: string | null
  referenceFiles?: string[]
  referenceLink?: string | null
  stylePref?: string | null
  brandName?: string | null
  industry?: string | null
  tagline?: string | null
  brandPersonality?: string | null
  quantity?: string | null
  numSlides?: string | null
  deadline?: string | null
  customerName?: string | null
  customerEmail?: string | null
  contactPref?: string | null
  status?: string | null
  assignedTo?: string | null
  deliveryLink?: string | null
  notes?: string | null
}

const HEADERS = [
  'Timestamp',
  'Order ID',
  'Service Type',
  'Task Title',
  'Creative Type',
  'Brief / Instructions',
  'Copy / Content',
  'Content Help?',
  'Assets / Links',
  'References / Inspo',
  'Style Preference',
  'Brand Name',
  'Industry & Tagline',
  'Brand Personality',
  'Quantity / Slides',
  'Deadline',
  'Client Name & Email',
  'Client Contact Details',
  'Task Status',
  'Assigned Designer / Editor',
  'Delivery Link (Figma/Drive)',
  'Designer Notes',
]

function getSpreadsheetId(): string {
  return (
    process.env.GOOGLE_ORDERS_SHEET_ID ||
    process.env.GOOGLE_SHEET_ID ||
    '1XLxEPvN8Brfott3zdUz2JhEVPdZu0cGUfZMX9hQbQWU'
  )
}

function getGoogleAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY

  if (!email || !key) {
    console.warn('[Google Sheets] Missing service account credentials in environment variables.')
    return null
  }

  const privateKey = key.replace(/\\n/g, '\n')
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

export function getGoogleSheetUrl(): string {
  const id = getSpreadsheetId()
  return `https://docs.google.com/spreadsheets/d/${id}/edit#gid=180087391`
}

/**
 * Format an OrderSheetPayload into an array of cell values matching HEADERS
 */
export function formatOrderRow(order: OrderSheetPayload): string[] {
  const ts = order.createdAt
    ? new Date(order.createdAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      })
    : new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      })

  // Shorten or format ID
  const shortId = order.orderId ? `#${order.orderId.slice(0, 8)}` : ''

  // Combine assets and reference files with any direct links
  const allAssets: string[] = []
  if (order.assetLink) allAssets.push(`Link: ${order.assetLink}`)
  if (order.assetFiles && order.assetFiles.length > 0) {
    allAssets.push(...order.assetFiles)
  }

  const allRefs: string[] = []
  if (order.referenceLink) allRefs.push(`Link: ${order.referenceLink}`)
  if (order.referenceFiles && order.referenceFiles.length > 0) {
    allRefs.push(...order.referenceFiles)
  }

  // Combine Industry & Tagline
  const indTagParts = [order.industry, order.tagline].filter(Boolean)
  const industryTagline = indTagParts.join(' | ')

  // Quantity or Slides
  const qtySlides = [
    order.quantity ? `Qty: ${order.quantity}` : '',
    order.numSlides ? `Slides: ${order.numSlides}` : '',
  ]
    .filter(Boolean)
    .join(' / ')

  // Client info
  const clientInfo = [order.customerName, order.customerEmail ? `<${order.customerEmail}>` : '']
    .filter(Boolean)
    .join(' ')

  // Status for designers to see
  const taskStatus = order.status ? order.status : 'Available / Unassigned'

  return [
    ts,
    shortId,
    order.serviceType || 'Design',
    order.title || '',
    order.creativeType || '-',
    order.brief || '',
    order.copyContent || '-',
    order.needContentHelp || 'No',
    allAssets.join('\n') || '-',
    allRefs.join('\n') || '-',
    order.stylePref || '-',
    order.brandName || '-',
    industryTagline || '-',
    order.brandPersonality || '-',
    qtySlides || '-',
    order.deadline || 'Standard',
    clientInfo || '-',
    order.contactPref || '-',
    taskStatus,
    order.assignedTo || '',
    order.deliveryLink || '',
    order.notes || '',
  ]
}

/**
 * Ensures the 'Orders' tab and header row exist in the spreadsheet
 */
export async function ensureOrdersSheetInitialized() {
  const auth = getGoogleAuth()
  if (!auth) return null

  try {
    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = getSpreadsheetId()

    const meta = await sheets.spreadsheets.get({ spreadsheetId })
    const existingSheets = meta.data.sheets || []
    const ordersSheet = existingSheets.find((s) => s.properties?.title === 'Orders')

    let sheetId = ordersSheet?.properties?.sheetId

    if (!ordersSheet) {
      // Add sheet
      const addRes = await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: 'Orders',
                  gridProperties: { rowCount: 1000, columnCount: HEADERS.length + 3 },
                },
              },
            },
          ],
        },
      })
      sheetId = addRes.data.replies?.[0]?.addSheet?.properties?.sheetId
    }

    // Check if headers exist
    const headerCheck = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Orders!A1:V1',
    })

    if (!headerCheck.data.values || headerCheck.data.values.length === 0) {
      // Write headers
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Orders!A1:V1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [HEADERS],
        },
      })

      // Format header row (Blue background, bold white text, freeze row 1)
      if (sheetId !== undefined) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [
              {
                updateSheetProperties: {
                  properties: {
                    sheetId,
                    gridProperties: { frozenRowCount: 1 },
                  },
                  fields: 'gridProperties.frozenRowCount',
                },
              },
              {
                repeatCell: {
                  range: {
                    sheetId,
                    startRowIndex: 0,
                    endRowIndex: 1,
                    startColumnIndex: 0,
                    endColumnIndex: HEADERS.length,
                  },
                  cell: {
                    userEnteredFormat: {
                      backgroundColor: { red: 0.16, green: 0.32, blue: 0.88 }, // Menew Brand Blue #2952E1
                      textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 }, fontSize: 10 },
                      horizontalAlignment: 'CENTER',
                      verticalAlignment: 'MIDDLE',
                    },
                  },
                  fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)',
                },
              },
            ],
          },
        })
      }
    }

    return sheetId
  } catch (err) {
    console.error('[Google Sheets] Error ensuring Orders sheet:', err)
    return null
  }
}

/**
 * Appends a new order directly to the 'Orders' sheet
 */
export async function appendOrderToGoogleSheet(payload: OrderSheetPayload) {
  try {
    const auth = getGoogleAuth()
    if (!auth) {
      console.warn('[Google Sheets] Skip append: No Google Auth configured.')
      return
    }

    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = getSpreadsheetId()

    await ensureOrdersSheetInitialized()

    const row = formatOrderRow(payload)

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Orders!A:V',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    })

    console.log(`[Google Sheets] Successfully appended order ${payload.orderId} to Google Sheet!`)
  } catch (err) {
    // Non-blocking: log error without interrupting the order completion
    console.error('[Google Sheets] Failed to append order to Google Sheet:', err)
  }
}

/**
 * Bulk sync all orders from Supabase into Google Sheet
 */
export async function syncAllOrdersFromSupabase() {
  const auth = getGoogleAuth()
  if (!auth) throw new Error('Missing Google Service Account credentials.')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Fetch all orders with profiles and files
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      profiles:customer_id (full_name, email, phone),
      order_files (*)
    `)
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(`Failed to fetch orders from Supabase: ${error.message}`)
  }

  if (!orders || orders.length === 0) {
    return { count: 0, message: 'No orders found to sync.' }
  }

  await ensureOrdersSheetInitialized()

  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = getSpreadsheetId()

  const rows = orders.map((o: any) => {
    const files = o.order_files || []
    const assetFiles = files
      .filter((f: any) => f.file_role === 'reference' && f.storage_path?.includes('/assets/'))
      .map((f: any) => f.file_name)
    const refFiles = files
      .filter((f: any) => f.file_role === 'reference' && f.storage_path?.includes('/references/'))
      .map((f: any) => f.file_name)

    const payload: OrderSheetPayload = {
      orderId: o.id,
      createdAt: o.created_at,
      serviceType: o.service_type,
      title: o.title,
      creativeType: o.creative_type,
      brief: o.brief,
      copyContent: o.copy_content,
      needContentHelp: o.need_content_help,
      assetFiles,
      assetLink: o.asset_link,
      referenceFiles: refFiles,
      referenceLink: o.reference_link,
      stylePref: o.style_pref,
      brandName: o.brand_name,
      industry: o.industry,
      tagline: o.tagline,
      brandPersonality: o.brand_personality,
      quantity: o.quantity,
      numSlides: o.num_slides,
      deadline: o.deadline_pref,
      customerName: o.profiles?.full_name,
      customerEmail: o.profiles?.email,
      contactPref: o.contact_pref || o.profiles?.phone,
      status: o.status === 'pending' ? 'Available / Unassigned' : o.status,
      assignedTo: o.assigned_admin || '',
    }

    return formatOrderRow(payload)
  })

  // Clear existing data rows below header (A2:V) to avoid duplicate entries when re-syncing
  try {
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'Orders!A2:V1000',
    })
  } catch (clearErr) {
    console.warn('[Google Sheets] Clear range warning:', clearErr)
  }

  // Write all rows
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Orders!A2:V',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: rows,
    },
  })

  return { count: rows.length, message: `Successfully synced ${rows.length} orders to Google Sheet!` }
}
