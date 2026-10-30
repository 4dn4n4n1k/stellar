/**
 * Central block registry.
 *
 * This is the single authoritative list of Payload blocks available to the
 * Pages and ReusableSections collections.  Import `pageBuilderBlocks` wherever
 * a `blocks` field needs the full registry.
 *
 * IMPORTANT — frontend rendering contract:
 *   The frontend renderer MUST map each block's `blockType` slug to an
 *   explicitly imported, statically known React component.  Do NOT load
 *   component names dynamically from CMS data.  The allowed slugs are:
 *     'hero' | 'rich-text' | 'image-text' | 'card-grid' | 'cta' | 'custom-section'
 */

import type { Block } from 'payload';
import { HeroBlock } from './HeroBlock';
import { RichTextBlock } from './RichTextBlock';
import { ImageTextBlock } from './ImageTextBlock';
import { CardGridBlock } from './CardGridBlock';
import { CTABlock } from './CTABlock';
import { CustomSectionBlock } from './CustomSectionBlock';

export const pageBuilderBlocks: Block[] = [
  HeroBlock,
  RichTextBlock,
  ImageTextBlock,
  CardGridBlock,
  CTABlock,
  CustomSectionBlock,
];

export {
  HeroBlock,
  RichTextBlock,
  ImageTextBlock,
  CardGridBlock,
  CTABlock,
  CustomSectionBlock,
};

