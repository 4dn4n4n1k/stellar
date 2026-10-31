import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'in_progress', 'resolved', 'spam');
  CREATE TYPE "public"."enum_publications_category" AS ENUM('Research Reports', 'Policy Briefs', 'Articles', 'Insights', 'Blogs');
  CREATE TYPE "public"."enum_publications_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__publications_v_version_category" AS ENUM('Research Reports', 'Policy Briefs', 'Articles', 'Insights', 'Blogs');
  CREATE TYPE "public"."enum__publications_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_team_members_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__team_members_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_associate_experts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__associate_experts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_job_openings_employment_type" AS ENUM('Full-time', 'Part-time', 'Consultancy', 'Contract', 'Internship');
  CREATE TYPE "public"."enum_job_openings_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__job_openings_v_version_employment_type" AS ENUM('Full-time', 'Part-time', 'Consultancy', 'Contract', 'Internship');
  CREATE TYPE "public"."enum__job_openings_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_pages_blocks_hero_actions_style" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_pages_blocks_hero_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_content_width" AS ENUM('narrow', 'standard', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_cta_tone" AS ENUM('navy', 'teal', 'light');
  CREATE TYPE "public"."enum_pages_blocks_custom_section_layout" AS ENUM('contained', 'full-width', 'split');
  CREATE TYPE "public"."enum_pages_blocks_custom_section_background" AS ENUM('default', 'light', 'navy', 'teal');
  CREATE TYPE "public"."enum_pages_blocks_custom_section_spacing" AS ENUM('compact', 'normal', 'relaxed');
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('standard', 'landing');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_actions_style" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_content_width" AS ENUM('narrow', 'standard', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_tone" AS ENUM('navy', 'teal', 'light');
  CREATE TYPE "public"."enum__pages_v_blocks_custom_section_layout" AS ENUM('contained', 'full-width', 'split');
  CREATE TYPE "public"."enum__pages_v_blocks_custom_section_background" AS ENUM('default', 'light', 'navy', 'teal');
  CREATE TYPE "public"."enum__pages_v_blocks_custom_section_spacing" AS ENUM('compact', 'normal', 'relaxed');
  CREATE TYPE "public"."enum__pages_v_version_page_type" AS ENUM('standard', 'landing');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_reusable_sections_blocks_hero_actions_style" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum_reusable_sections_blocks_hero_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_reusable_sections_blocks_rich_text_content_width" AS ENUM('narrow', 'standard', 'wide');
  CREATE TYPE "public"."enum_reusable_sections_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_reusable_sections_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_reusable_sections_blocks_cta_tone" AS ENUM('navy', 'teal', 'light');
  CREATE TYPE "public"."enum_reusable_sections_blocks_custom_section_layout" AS ENUM('contained', 'full-width', 'split');
  CREATE TYPE "public"."enum_reusable_sections_blocks_custom_section_background" AS ENUM('default', 'light', 'navy', 'teal');
  CREATE TYPE "public"."enum_reusable_sections_blocks_custom_section_spacing" AS ENUM('compact', 'normal', 'relaxed');
  CREATE TYPE "public"."enum_reusable_sections_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__reusable_sections_v_blocks_hero_actions_style" AS ENUM('primary', 'secondary', 'ghost');
  CREATE TYPE "public"."enum__reusable_sections_v_blocks_hero_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__reusable_sections_v_blocks_rich_text_content_width" AS ENUM('narrow', 'standard', 'wide');
  CREATE TYPE "public"."enum__reusable_sections_v_blocks_image_text_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__reusable_sections_v_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__reusable_sections_v_blocks_cta_tone" AS ENUM('navy', 'teal', 'light');
  CREATE TYPE "public"."enum__reusable_sections_v_blocks_custom_section_layout" AS ENUM('contained', 'full-width', 'split');
  CREATE TYPE "public"."enum__reusable_sections_v_blocks_custom_section_background" AS ENUM('default', 'light', 'navy', 'teal');
  CREATE TYPE "public"."enum__reusable_sections_v_blocks_custom_section_spacing" AS ENUM('compact', 'normal', 'relaxed');
  CREATE TYPE "public"."enum__reusable_sections_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'admin' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"subject" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"status" "enum_contact_submissions_status" DEFAULT 'new' NOT NULL,
  	"honeypot" varchar,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"category" "enum_publications_category",
  	"publication_date" timestamp(3) with time zone,
  	"cover_image_id" integer,
  	"document_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_publications_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_publications_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_category" "enum__publications_v_version_category",
  	"version_publication_date" timestamp(3) with time zone,
  	"version_cover_image_id" integer,
  	"version_document_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__publications_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "team_members_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"title" varchar,
  	"bio" varchar,
  	"profile_image_id" integer,
  	"display_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_team_members_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_team_members_v_version_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_team_members_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_title" varchar,
  	"version_bio" varchar,
  	"version_profile_image_id" integer,
  	"version_display_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__team_members_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "associate_experts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"expertise" varchar,
  	"profile_image_id" integer,
  	"display_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_associate_experts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_associate_experts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_expertise" varchar,
  	"version_profile_image_id" integer,
  	"version_display_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__associate_experts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "job_openings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"employment_type" "enum_job_openings_employment_type" DEFAULT 'Consultancy',
  	"location" varchar DEFAULT 'Dhaka, Bangladesh',
  	"application_deadline" timestamp(3) with time zone,
  	"display_order" numeric,
  	"description" varchar,
  	"application_instructions" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_job_openings_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_job_openings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_employment_type" "enum__job_openings_v_version_employment_type" DEFAULT 'Consultancy',
  	"version_location" varchar DEFAULT 'Dhaka, Bangladesh',
  	"version_application_deadline" timestamp(3) with time zone,
  	"version_display_order" numeric,
  	"version_description" varchar,
  	"version_application_instructions" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__job_openings_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "pages_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum_pages_blocks_hero_actions_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"alignment" "enum_pages_blocks_hero_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"content_width" "enum_pages_blocks_rich_text_content_width" DEFAULT 'standard',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_image_text_image_position" DEFAULT 'left',
  	"alt_override" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"href" varchar,
  	"body" jsonb
  );
  
  CREATE TABLE "pages_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"introduction" varchar,
  	"columns" "enum_pages_blocks_card_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"tone" "enum_pages_blocks_cta_tone" DEFAULT 'navy',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_custom_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"internal_label" varchar,
  	"layout" "enum_pages_blocks_custom_section_layout" DEFAULT 'contained',
  	"background" "enum_pages_blocks_custom_section_background" DEFAULT 'default',
  	"spacing" "enum_pages_blocks_custom_section_spacing" DEFAULT 'normal',
  	"custom_c_s_s" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"page_type" "enum_pages_page_type" DEFAULT 'standard',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"custom_c_s_s" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum__pages_v_blocks_hero_actions_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"alignment" "enum__pages_v_blocks_hero_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"content_width" "enum__pages_v_blocks_rich_text_content_width" DEFAULT 'standard',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_image_text_image_position" DEFAULT 'left',
  	"alt_override" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"href" varchar,
  	"body" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"introduction" varchar,
  	"columns" "enum__pages_v_blocks_card_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"tone" "enum__pages_v_blocks_cta_tone" DEFAULT 'navy',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_custom_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"internal_label" varchar,
  	"layout" "enum__pages_v_blocks_custom_section_layout" DEFAULT 'contained',
  	"background" "enum__pages_v_blocks_custom_section_background" DEFAULT 'default',
  	"spacing" "enum__pages_v_blocks_custom_section_spacing" DEFAULT 'normal',
  	"custom_c_s_s" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_page_type" "enum__pages_v_version_page_type" DEFAULT 'standard',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_custom_c_s_s" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "reusable_sections_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum_reusable_sections_blocks_hero_actions_style" DEFAULT 'primary'
  );
  
  CREATE TABLE "reusable_sections_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"alignment" "enum_reusable_sections_blocks_hero_alignment" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_sections_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"content_width" "enum_reusable_sections_blocks_rich_text_content_width" DEFAULT 'standard',
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_sections_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum_reusable_sections_blocks_image_text_image_position" DEFAULT 'left',
  	"alt_override" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_sections_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"href" varchar,
  	"body" jsonb
  );
  
  CREATE TABLE "reusable_sections_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"introduction" varchar,
  	"columns" "enum_reusable_sections_blocks_card_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_sections_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"tone" "enum_reusable_sections_blocks_cta_tone" DEFAULT 'navy',
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_sections_blocks_custom_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"internal_label" varchar,
  	"layout" "enum_reusable_sections_blocks_custom_section_layout" DEFAULT 'contained',
  	"background" "enum_reusable_sections_blocks_custom_section_background" DEFAULT 'default',
  	"spacing" "enum_reusable_sections_blocks_custom_section_spacing" DEFAULT 'normal',
  	"custom_c_s_s" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "reusable_sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_reusable_sections_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_reusable_sections_v_blocks_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"style" "enum__reusable_sections_v_blocks_hero_actions_style" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reusable_sections_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"alignment" "enum__reusable_sections_v_blocks_hero_alignment" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reusable_sections_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"content_width" "enum__reusable_sections_v_blocks_rich_text_content_width" DEFAULT 'standard',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reusable_sections_v_blocks_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"content" jsonb,
  	"image_id" integer,
  	"image_position" "enum__reusable_sections_v_blocks_image_text_image_position" DEFAULT 'left',
  	"alt_override" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reusable_sections_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"href" varchar,
  	"body" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_reusable_sections_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"introduction" varchar,
  	"columns" "enum__reusable_sections_v_blocks_card_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reusable_sections_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"tone" "enum__reusable_sections_v_blocks_cta_tone" DEFAULT 'navy',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reusable_sections_v_blocks_custom_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"internal_label" varchar,
  	"layout" "enum__reusable_sections_v_blocks_custom_section_layout" DEFAULT 'contained',
  	"background" "enum__reusable_sections_v_blocks_custom_section_background" DEFAULT 'default',
  	"spacing" "enum__reusable_sections_v_blocks_custom_section_spacing" DEFAULT 'normal',
  	"custom_c_s_s" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_reusable_sections_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__reusable_sections_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"contact_submissions_id" integer,
  	"media_id" integer,
  	"publications_id" integer,
  	"team_members_id" integer,
  	"associate_experts_id" integer,
  	"job_openings_id" integer,
  	"pages_id" integer,
  	"reusable_sections_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_document_id_media_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_parent_id_publications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_document_id_media_id_fk" FOREIGN KEY ("version_document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_members_expertise" ADD CONSTRAINT "team_members_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_profile_image_id_media_id_fk" FOREIGN KEY ("profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_members_v_version_expertise" ADD CONSTRAINT "_team_members_v_version_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_team_members_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_team_members_v" ADD CONSTRAINT "_team_members_v_parent_id_team_members_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_team_members_v" ADD CONSTRAINT "_team_members_v_version_profile_image_id_media_id_fk" FOREIGN KEY ("version_profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "associate_experts" ADD CONSTRAINT "associate_experts_profile_image_id_media_id_fk" FOREIGN KEY ("profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_associate_experts_v" ADD CONSTRAINT "_associate_experts_v_parent_id_associate_experts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."associate_experts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_associate_experts_v" ADD CONSTRAINT "_associate_experts_v_version_profile_image_id_media_id_fk" FOREIGN KEY ("version_profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_job_openings_v" ADD CONSTRAINT "_job_openings_v_parent_id_job_openings_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."job_openings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_actions" ADD CONSTRAINT "pages_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text" ADD CONSTRAINT "pages_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_custom_section" ADD CONSTRAINT "pages_blocks_custom_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_actions" ADD CONSTRAINT "_pages_v_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text" ADD CONSTRAINT "_pages_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid" ADD CONSTRAINT "_pages_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_custom_section" ADD CONSTRAINT "_pages_v_blocks_custom_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reusable_sections_blocks_hero_actions" ADD CONSTRAINT "reusable_sections_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_sections_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_sections_blocks_hero" ADD CONSTRAINT "reusable_sections_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reusable_sections_blocks_hero" ADD CONSTRAINT "reusable_sections_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_sections_blocks_rich_text" ADD CONSTRAINT "reusable_sections_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_sections_blocks_image_text" ADD CONSTRAINT "reusable_sections_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reusable_sections_blocks_image_text" ADD CONSTRAINT "reusable_sections_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_sections_blocks_card_grid_cards" ADD CONSTRAINT "reusable_sections_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reusable_sections_blocks_card_grid_cards" ADD CONSTRAINT "reusable_sections_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_sections_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_sections_blocks_card_grid" ADD CONSTRAINT "reusable_sections_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_sections_blocks_cta" ADD CONSTRAINT "reusable_sections_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reusable_sections_blocks_custom_section" ADD CONSTRAINT "reusable_sections_blocks_custom_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reusable_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reusable_sections_v_blocks_hero_actions" ADD CONSTRAINT "_reusable_sections_v_blocks_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reusable_sections_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reusable_sections_v_blocks_hero" ADD CONSTRAINT "_reusable_sections_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reusable_sections_v_blocks_hero" ADD CONSTRAINT "_reusable_sections_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reusable_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reusable_sections_v_blocks_rich_text" ADD CONSTRAINT "_reusable_sections_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reusable_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reusable_sections_v_blocks_image_text" ADD CONSTRAINT "_reusable_sections_v_blocks_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reusable_sections_v_blocks_image_text" ADD CONSTRAINT "_reusable_sections_v_blocks_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reusable_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reusable_sections_v_blocks_card_grid_cards" ADD CONSTRAINT "_reusable_sections_v_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_reusable_sections_v_blocks_card_grid_cards" ADD CONSTRAINT "_reusable_sections_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reusable_sections_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reusable_sections_v_blocks_card_grid" ADD CONSTRAINT "_reusable_sections_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reusable_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reusable_sections_v_blocks_cta" ADD CONSTRAINT "_reusable_sections_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reusable_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reusable_sections_v_blocks_custom_section" ADD CONSTRAINT "_reusable_sections_v_blocks_custom_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_reusable_sections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_reusable_sections_v" ADD CONSTRAINT "_reusable_sections_v_parent_id_reusable_sections_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."reusable_sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_associate_experts_fk" FOREIGN KEY ("associate_experts_id") REFERENCES "public"."associate_experts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_openings_fk" FOREIGN KEY ("job_openings_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reusable_sections_fk" FOREIGN KEY ("reusable_sections_id") REFERENCES "public"."reusable_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "publications_title_idx" ON "publications" USING btree ("title");
  CREATE UNIQUE INDEX "publications_slug_idx" ON "publications" USING btree ("slug");
  CREATE INDEX "publications_category_idx" ON "publications" USING btree ("category");
  CREATE INDEX "publications_cover_image_idx" ON "publications" USING btree ("cover_image_id");
  CREATE INDEX "publications_document_idx" ON "publications" USING btree ("document_id");
  CREATE INDEX "publications_updated_at_idx" ON "publications" USING btree ("updated_at");
  CREATE INDEX "publications_created_at_idx" ON "publications" USING btree ("created_at");
  CREATE INDEX "publications__status_idx" ON "publications" USING btree ("_status");
  CREATE INDEX "_publications_v_parent_idx" ON "_publications_v" USING btree ("parent_id");
  CREATE INDEX "_publications_v_version_version_title_idx" ON "_publications_v" USING btree ("version_title");
  CREATE INDEX "_publications_v_version_version_slug_idx" ON "_publications_v" USING btree ("version_slug");
  CREATE INDEX "_publications_v_version_version_category_idx" ON "_publications_v" USING btree ("version_category");
  CREATE INDEX "_publications_v_version_version_cover_image_idx" ON "_publications_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_publications_v_version_version_document_idx" ON "_publications_v" USING btree ("version_document_id");
  CREATE INDEX "_publications_v_version_version_updated_at_idx" ON "_publications_v" USING btree ("version_updated_at");
  CREATE INDEX "_publications_v_version_version_created_at_idx" ON "_publications_v" USING btree ("version_created_at");
  CREATE INDEX "_publications_v_version_version__status_idx" ON "_publications_v" USING btree ("version__status");
  CREATE INDEX "_publications_v_created_at_idx" ON "_publications_v" USING btree ("created_at");
  CREATE INDEX "_publications_v_updated_at_idx" ON "_publications_v" USING btree ("updated_at");
  CREATE INDEX "_publications_v_latest_idx" ON "_publications_v" USING btree ("latest");
  CREATE INDEX "team_members_expertise_order_idx" ON "team_members_expertise" USING btree ("_order");
  CREATE INDEX "team_members_expertise_parent_id_idx" ON "team_members_expertise" USING btree ("_parent_id");
  CREATE INDEX "team_members_name_idx" ON "team_members" USING btree ("name");
  CREATE INDEX "team_members_profile_image_idx" ON "team_members" USING btree ("profile_image_id");
  CREATE INDEX "team_members_display_order_idx" ON "team_members" USING btree ("display_order");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  CREATE INDEX "team_members__status_idx" ON "team_members" USING btree ("_status");
  CREATE INDEX "_team_members_v_version_expertise_order_idx" ON "_team_members_v_version_expertise" USING btree ("_order");
  CREATE INDEX "_team_members_v_version_expertise_parent_id_idx" ON "_team_members_v_version_expertise" USING btree ("_parent_id");
  CREATE INDEX "_team_members_v_parent_idx" ON "_team_members_v" USING btree ("parent_id");
  CREATE INDEX "_team_members_v_version_version_name_idx" ON "_team_members_v" USING btree ("version_name");
  CREATE INDEX "_team_members_v_version_version_profile_image_idx" ON "_team_members_v" USING btree ("version_profile_image_id");
  CREATE INDEX "_team_members_v_version_version_display_order_idx" ON "_team_members_v" USING btree ("version_display_order");
  CREATE INDEX "_team_members_v_version_version_updated_at_idx" ON "_team_members_v" USING btree ("version_updated_at");
  CREATE INDEX "_team_members_v_version_version_created_at_idx" ON "_team_members_v" USING btree ("version_created_at");
  CREATE INDEX "_team_members_v_version_version__status_idx" ON "_team_members_v" USING btree ("version__status");
  CREATE INDEX "_team_members_v_created_at_idx" ON "_team_members_v" USING btree ("created_at");
  CREATE INDEX "_team_members_v_updated_at_idx" ON "_team_members_v" USING btree ("updated_at");
  CREATE INDEX "_team_members_v_latest_idx" ON "_team_members_v" USING btree ("latest");
  CREATE INDEX "associate_experts_title_idx" ON "associate_experts" USING btree ("title");
  CREATE INDEX "associate_experts_profile_image_idx" ON "associate_experts" USING btree ("profile_image_id");
  CREATE INDEX "associate_experts_display_order_idx" ON "associate_experts" USING btree ("display_order");
  CREATE INDEX "associate_experts_updated_at_idx" ON "associate_experts" USING btree ("updated_at");
  CREATE INDEX "associate_experts_created_at_idx" ON "associate_experts" USING btree ("created_at");
  CREATE INDEX "associate_experts__status_idx" ON "associate_experts" USING btree ("_status");
  CREATE INDEX "_associate_experts_v_parent_idx" ON "_associate_experts_v" USING btree ("parent_id");
  CREATE INDEX "_associate_experts_v_version_version_title_idx" ON "_associate_experts_v" USING btree ("version_title");
  CREATE INDEX "_associate_experts_v_version_version_profile_image_idx" ON "_associate_experts_v" USING btree ("version_profile_image_id");
  CREATE INDEX "_associate_experts_v_version_version_display_order_idx" ON "_associate_experts_v" USING btree ("version_display_order");
  CREATE INDEX "_associate_experts_v_version_version_updated_at_idx" ON "_associate_experts_v" USING btree ("version_updated_at");
  CREATE INDEX "_associate_experts_v_version_version_created_at_idx" ON "_associate_experts_v" USING btree ("version_created_at");
  CREATE INDEX "_associate_experts_v_version_version__status_idx" ON "_associate_experts_v" USING btree ("version__status");
  CREATE INDEX "_associate_experts_v_created_at_idx" ON "_associate_experts_v" USING btree ("created_at");
  CREATE INDEX "_associate_experts_v_updated_at_idx" ON "_associate_experts_v" USING btree ("updated_at");
  CREATE INDEX "_associate_experts_v_latest_idx" ON "_associate_experts_v" USING btree ("latest");
  CREATE INDEX "job_openings_title_idx" ON "job_openings" USING btree ("title");
  CREATE INDEX "job_openings_employment_type_idx" ON "job_openings" USING btree ("employment_type");
  CREATE INDEX "job_openings_display_order_idx" ON "job_openings" USING btree ("display_order");
  CREATE INDEX "job_openings_updated_at_idx" ON "job_openings" USING btree ("updated_at");
  CREATE INDEX "job_openings_created_at_idx" ON "job_openings" USING btree ("created_at");
  CREATE INDEX "job_openings__status_idx" ON "job_openings" USING btree ("_status");
  CREATE INDEX "_job_openings_v_parent_idx" ON "_job_openings_v" USING btree ("parent_id");
  CREATE INDEX "_job_openings_v_version_version_title_idx" ON "_job_openings_v" USING btree ("version_title");
  CREATE INDEX "_job_openings_v_version_version_employment_type_idx" ON "_job_openings_v" USING btree ("version_employment_type");
  CREATE INDEX "_job_openings_v_version_version_display_order_idx" ON "_job_openings_v" USING btree ("version_display_order");
  CREATE INDEX "_job_openings_v_version_version_updated_at_idx" ON "_job_openings_v" USING btree ("version_updated_at");
  CREATE INDEX "_job_openings_v_version_version_created_at_idx" ON "_job_openings_v" USING btree ("version_created_at");
  CREATE INDEX "_job_openings_v_version_version__status_idx" ON "_job_openings_v" USING btree ("version__status");
  CREATE INDEX "_job_openings_v_created_at_idx" ON "_job_openings_v" USING btree ("created_at");
  CREATE INDEX "_job_openings_v_updated_at_idx" ON "_job_openings_v" USING btree ("updated_at");
  CREATE INDEX "_job_openings_v_latest_idx" ON "_job_openings_v" USING btree ("latest");
  CREATE INDEX "pages_blocks_hero_actions_order_idx" ON "pages_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_actions_parent_id_idx" ON "pages_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_order_idx" ON "pages_blocks_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_parent_id_idx" ON "pages_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_path_idx" ON "pages_blocks_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_image_idx" ON "pages_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_grid_cards_order_idx" ON "pages_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_cards_parent_id_idx" ON "pages_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_cards_image_idx" ON "pages_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_grid_order_idx" ON "pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_parent_id_idx" ON "pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_path_idx" ON "pages_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_custom_section_order_idx" ON "pages_blocks_custom_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_custom_section_parent_id_idx" ON "pages_blocks_custom_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_custom_section_path_idx" ON "pages_blocks_custom_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_actions_order_idx" ON "_pages_v_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_actions_parent_id_idx" ON "_pages_v_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_background_image_idx" ON "_pages_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_order_idx" ON "_pages_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_parent_id_idx" ON "_pages_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_path_idx" ON "_pages_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_image_idx" ON "_pages_v_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_order_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_parent_id_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_image_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_grid_order_idx" ON "_pages_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_parent_id_idx" ON "_pages_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_path_idx" ON "_pages_v_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_custom_section_order_idx" ON "_pages_v_blocks_custom_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_custom_section_parent_id_idx" ON "_pages_v_blocks_custom_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_custom_section_path_idx" ON "_pages_v_blocks_custom_section" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "reusable_sections_blocks_hero_actions_order_idx" ON "reusable_sections_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "reusable_sections_blocks_hero_actions_parent_id_idx" ON "reusable_sections_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "reusable_sections_blocks_hero_order_idx" ON "reusable_sections_blocks_hero" USING btree ("_order");
  CREATE INDEX "reusable_sections_blocks_hero_parent_id_idx" ON "reusable_sections_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "reusable_sections_blocks_hero_path_idx" ON "reusable_sections_blocks_hero" USING btree ("_path");
  CREATE INDEX "reusable_sections_blocks_hero_background_image_idx" ON "reusable_sections_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "reusable_sections_blocks_rich_text_order_idx" ON "reusable_sections_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "reusable_sections_blocks_rich_text_parent_id_idx" ON "reusable_sections_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "reusable_sections_blocks_rich_text_path_idx" ON "reusable_sections_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "reusable_sections_blocks_image_text_order_idx" ON "reusable_sections_blocks_image_text" USING btree ("_order");
  CREATE INDEX "reusable_sections_blocks_image_text_parent_id_idx" ON "reusable_sections_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "reusable_sections_blocks_image_text_path_idx" ON "reusable_sections_blocks_image_text" USING btree ("_path");
  CREATE INDEX "reusable_sections_blocks_image_text_image_idx" ON "reusable_sections_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "reusable_sections_blocks_card_grid_cards_order_idx" ON "reusable_sections_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "reusable_sections_blocks_card_grid_cards_parent_id_idx" ON "reusable_sections_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "reusable_sections_blocks_card_grid_cards_image_idx" ON "reusable_sections_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "reusable_sections_blocks_card_grid_order_idx" ON "reusable_sections_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "reusable_sections_blocks_card_grid_parent_id_idx" ON "reusable_sections_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "reusable_sections_blocks_card_grid_path_idx" ON "reusable_sections_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "reusable_sections_blocks_cta_order_idx" ON "reusable_sections_blocks_cta" USING btree ("_order");
  CREATE INDEX "reusable_sections_blocks_cta_parent_id_idx" ON "reusable_sections_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "reusable_sections_blocks_cta_path_idx" ON "reusable_sections_blocks_cta" USING btree ("_path");
  CREATE INDEX "reusable_sections_blocks_custom_section_order_idx" ON "reusable_sections_blocks_custom_section" USING btree ("_order");
  CREATE INDEX "reusable_sections_blocks_custom_section_parent_id_idx" ON "reusable_sections_blocks_custom_section" USING btree ("_parent_id");
  CREATE INDEX "reusable_sections_blocks_custom_section_path_idx" ON "reusable_sections_blocks_custom_section" USING btree ("_path");
  CREATE INDEX "reusable_sections_updated_at_idx" ON "reusable_sections" USING btree ("updated_at");
  CREATE INDEX "reusable_sections_created_at_idx" ON "reusable_sections" USING btree ("created_at");
  CREATE INDEX "reusable_sections__status_idx" ON "reusable_sections" USING btree ("_status");
  CREATE INDEX "_reusable_sections_v_blocks_hero_actions_order_idx" ON "_reusable_sections_v_blocks_hero_actions" USING btree ("_order");
  CREATE INDEX "_reusable_sections_v_blocks_hero_actions_parent_id_idx" ON "_reusable_sections_v_blocks_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "_reusable_sections_v_blocks_hero_order_idx" ON "_reusable_sections_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_reusable_sections_v_blocks_hero_parent_id_idx" ON "_reusable_sections_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_reusable_sections_v_blocks_hero_path_idx" ON "_reusable_sections_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_reusable_sections_v_blocks_hero_background_image_idx" ON "_reusable_sections_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_reusable_sections_v_blocks_rich_text_order_idx" ON "_reusable_sections_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_reusable_sections_v_blocks_rich_text_parent_id_idx" ON "_reusable_sections_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_reusable_sections_v_blocks_rich_text_path_idx" ON "_reusable_sections_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_reusable_sections_v_blocks_image_text_order_idx" ON "_reusable_sections_v_blocks_image_text" USING btree ("_order");
  CREATE INDEX "_reusable_sections_v_blocks_image_text_parent_id_idx" ON "_reusable_sections_v_blocks_image_text" USING btree ("_parent_id");
  CREATE INDEX "_reusable_sections_v_blocks_image_text_path_idx" ON "_reusable_sections_v_blocks_image_text" USING btree ("_path");
  CREATE INDEX "_reusable_sections_v_blocks_image_text_image_idx" ON "_reusable_sections_v_blocks_image_text" USING btree ("image_id");
  CREATE INDEX "_reusable_sections_v_blocks_card_grid_cards_order_idx" ON "_reusable_sections_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_reusable_sections_v_blocks_card_grid_cards_parent_id_idx" ON "_reusable_sections_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_reusable_sections_v_blocks_card_grid_cards_image_idx" ON "_reusable_sections_v_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "_reusable_sections_v_blocks_card_grid_order_idx" ON "_reusable_sections_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_reusable_sections_v_blocks_card_grid_parent_id_idx" ON "_reusable_sections_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_reusable_sections_v_blocks_card_grid_path_idx" ON "_reusable_sections_v_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "_reusable_sections_v_blocks_cta_order_idx" ON "_reusable_sections_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_reusable_sections_v_blocks_cta_parent_id_idx" ON "_reusable_sections_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_reusable_sections_v_blocks_cta_path_idx" ON "_reusable_sections_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_reusable_sections_v_blocks_custom_section_order_idx" ON "_reusable_sections_v_blocks_custom_section" USING btree ("_order");
  CREATE INDEX "_reusable_sections_v_blocks_custom_section_parent_id_idx" ON "_reusable_sections_v_blocks_custom_section" USING btree ("_parent_id");
  CREATE INDEX "_reusable_sections_v_blocks_custom_section_path_idx" ON "_reusable_sections_v_blocks_custom_section" USING btree ("_path");
  CREATE INDEX "_reusable_sections_v_parent_idx" ON "_reusable_sections_v" USING btree ("parent_id");
  CREATE INDEX "_reusable_sections_v_version_version_updated_at_idx" ON "_reusable_sections_v" USING btree ("version_updated_at");
  CREATE INDEX "_reusable_sections_v_version_version_created_at_idx" ON "_reusable_sections_v" USING btree ("version_created_at");
  CREATE INDEX "_reusable_sections_v_version_version__status_idx" ON "_reusable_sections_v" USING btree ("version__status");
  CREATE INDEX "_reusable_sections_v_created_at_idx" ON "_reusable_sections_v" USING btree ("created_at");
  CREATE INDEX "_reusable_sections_v_updated_at_idx" ON "_reusable_sections_v" USING btree ("updated_at");
  CREATE INDEX "_reusable_sections_v_latest_idx" ON "_reusable_sections_v" USING btree ("latest");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("publications_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_associate_experts_id_idx" ON "payload_locked_documents_rels" USING btree ("associate_experts_id");
  CREATE INDEX "payload_locked_documents_rels_job_openings_id_idx" ON "payload_locked_documents_rels" USING btree ("job_openings_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_reusable_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("reusable_sections_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "contact_submissions" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "publications" CASCADE;
  DROP TABLE "_publications_v" CASCADE;
  DROP TABLE "team_members_expertise" CASCADE;
  DROP TABLE "team_members" CASCADE;
  DROP TABLE "_team_members_v_version_expertise" CASCADE;
  DROP TABLE "_team_members_v" CASCADE;
  DROP TABLE "associate_experts" CASCADE;
  DROP TABLE "_associate_experts_v" CASCADE;
  DROP TABLE "job_openings" CASCADE;
  DROP TABLE "_job_openings_v" CASCADE;
  DROP TABLE "pages_blocks_hero_actions" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_image_text" CASCADE;
  DROP TABLE "pages_blocks_card_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_card_grid" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_custom_section" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_actions" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_custom_section" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "reusable_sections_blocks_hero_actions" CASCADE;
  DROP TABLE "reusable_sections_blocks_hero" CASCADE;
  DROP TABLE "reusable_sections_blocks_rich_text" CASCADE;
  DROP TABLE "reusable_sections_blocks_image_text" CASCADE;
  DROP TABLE "reusable_sections_blocks_card_grid_cards" CASCADE;
  DROP TABLE "reusable_sections_blocks_card_grid" CASCADE;
  DROP TABLE "reusable_sections_blocks_cta" CASCADE;
  DROP TABLE "reusable_sections_blocks_custom_section" CASCADE;
  DROP TABLE "reusable_sections" CASCADE;
  DROP TABLE "_reusable_sections_v_blocks_hero_actions" CASCADE;
  DROP TABLE "_reusable_sections_v_blocks_hero" CASCADE;
  DROP TABLE "_reusable_sections_v_blocks_rich_text" CASCADE;
  DROP TABLE "_reusable_sections_v_blocks_image_text" CASCADE;
  DROP TABLE "_reusable_sections_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_reusable_sections_v_blocks_card_grid" CASCADE;
  DROP TABLE "_reusable_sections_v_blocks_cta" CASCADE;
  DROP TABLE "_reusable_sections_v_blocks_custom_section" CASCADE;
  DROP TABLE "_reusable_sections_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_contact_submissions_status";
  DROP TYPE "public"."enum_publications_category";
  DROP TYPE "public"."enum_publications_status";
  DROP TYPE "public"."enum__publications_v_version_category";
  DROP TYPE "public"."enum__publications_v_version_status";
  DROP TYPE "public"."enum_team_members_status";
  DROP TYPE "public"."enum__team_members_v_version_status";
  DROP TYPE "public"."enum_associate_experts_status";
  DROP TYPE "public"."enum__associate_experts_v_version_status";
  DROP TYPE "public"."enum_job_openings_employment_type";
  DROP TYPE "public"."enum_job_openings_status";
  DROP TYPE "public"."enum__job_openings_v_version_employment_type";
  DROP TYPE "public"."enum__job_openings_v_version_status";
  DROP TYPE "public"."enum_pages_blocks_hero_actions_style";
  DROP TYPE "public"."enum_pages_blocks_hero_alignment";
  DROP TYPE "public"."enum_pages_blocks_rich_text_content_width";
  DROP TYPE "public"."enum_pages_blocks_image_text_image_position";
  DROP TYPE "public"."enum_pages_blocks_card_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_cta_tone";
  DROP TYPE "public"."enum_pages_blocks_custom_section_layout";
  DROP TYPE "public"."enum_pages_blocks_custom_section_background";
  DROP TYPE "public"."enum_pages_blocks_custom_section_spacing";
  DROP TYPE "public"."enum_pages_page_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_actions_style";
  DROP TYPE "public"."enum__pages_v_blocks_hero_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_content_width";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_cta_tone";
  DROP TYPE "public"."enum__pages_v_blocks_custom_section_layout";
  DROP TYPE "public"."enum__pages_v_blocks_custom_section_background";
  DROP TYPE "public"."enum__pages_v_blocks_custom_section_spacing";
  DROP TYPE "public"."enum__pages_v_version_page_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_reusable_sections_blocks_hero_actions_style";
  DROP TYPE "public"."enum_reusable_sections_blocks_hero_alignment";
  DROP TYPE "public"."enum_reusable_sections_blocks_rich_text_content_width";
  DROP TYPE "public"."enum_reusable_sections_blocks_image_text_image_position";
  DROP TYPE "public"."enum_reusable_sections_blocks_card_grid_columns";
  DROP TYPE "public"."enum_reusable_sections_blocks_cta_tone";
  DROP TYPE "public"."enum_reusable_sections_blocks_custom_section_layout";
  DROP TYPE "public"."enum_reusable_sections_blocks_custom_section_background";
  DROP TYPE "public"."enum_reusable_sections_blocks_custom_section_spacing";
  DROP TYPE "public"."enum_reusable_sections_status";
  DROP TYPE "public"."enum__reusable_sections_v_blocks_hero_actions_style";
  DROP TYPE "public"."enum__reusable_sections_v_blocks_hero_alignment";
  DROP TYPE "public"."enum__reusable_sections_v_blocks_rich_text_content_width";
  DROP TYPE "public"."enum__reusable_sections_v_blocks_image_text_image_position";
  DROP TYPE "public"."enum__reusable_sections_v_blocks_card_grid_columns";
  DROP TYPE "public"."enum__reusable_sections_v_blocks_cta_tone";
  DROP TYPE "public"."enum__reusable_sections_v_blocks_custom_section_layout";
  DROP TYPE "public"."enum__reusable_sections_v_blocks_custom_section_background";
  DROP TYPE "public"."enum__reusable_sections_v_blocks_custom_section_spacing";
  DROP TYPE "public"."enum__reusable_sections_v_version_status";`)
}
