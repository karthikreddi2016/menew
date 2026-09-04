-- Migration: Add all order form fields that were previously not saved
-- These fields are collected in the order form but were never persisted.

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS copy_content      text,
  ADD COLUMN IF NOT EXISTS need_content_help text DEFAULT 'no',
  ADD COLUMN IF NOT EXISTS asset_link        text,
  ADD COLUMN IF NOT EXISTS reference_link    text,
  ADD COLUMN IF NOT EXISTS style_pref        text,
  ADD COLUMN IF NOT EXISTS contact_pref      text,
  ADD COLUMN IF NOT EXISTS quantity          text,
  ADD COLUMN IF NOT EXISTS creative_type     text,
  ADD COLUMN IF NOT EXISTS purpose           text,
  ADD COLUMN IF NOT EXISTS brand_name        text,
  ADD COLUMN IF NOT EXISTS industry          text,
  ADD COLUMN IF NOT EXISTS tagline           text,
  ADD COLUMN IF NOT EXISTS brand_personality text,
  ADD COLUMN IF NOT EXISTS num_slides        text;
