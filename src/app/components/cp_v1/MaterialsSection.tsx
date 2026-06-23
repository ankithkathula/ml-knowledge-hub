import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState, useRef } from 'react';
import { ImageWithFallback } from "../figma/ImageWithFallback";

const materialCategories = [
  { id: 'wood', label: 'Wood' },
  { id: 'stone', label: 'Stone' },
  { id: 'metal', label: 'Metal' },
  { id: 'glass', label: 'Glass' },
  { id: 'ceramic', label: 'Ceramic' },
  { id: 'composite', label: 'Composite' },
  { id: 'fabric', label: 'Fabric' },
];

const products = [
  // Wood Products
  {
    id: 1,
    name: 'Premium Oak Veneer Panels',
    category: 'wood',
    brand: 'WoodCraft',
    material: 'Engineered Wood',
    price: 245,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1611072337226-1140ab367200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvYWslMjB3b29kJTIwdGV4dHVyZXxlbnwxfHx8fDE3NjQ3NjAxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Walnut Wood Flooring',
    category: 'wood',
    brand: 'WoodCraft',
    material: 'Solid Hardwood',
    price: 285,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1642935264339-694e0fb27b0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWxudXQlMjB3b29kJTIwZmxvb3Jpbmd8ZW58MXx8fHwxNzY0NzQ4NTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Teak Wood Decking Planks',
    category: 'wood',
    brand: 'TimberPro',
    material: 'Natural Teak',
    price: 395,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1617262869353-3c653071818c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFrJTIwd29vZCUyMHBsYW5rc3xlbnwxfHx8fDE3NjQ3NjAxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    name: 'Maple Laminated Panels',
    category: 'wood',
    brand: 'WoodCraft',
    material: 'Laminated Wood',
    price: 185,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1680538993934-f81adb9e7828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXBsZSUyMHdvb2QlMjBzdXJmYWNlfGVufDF8fHx8MTc2NDc2MDExMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    name: 'Mahogany Ceiling Planks',
    category: 'wood',
    brand: 'TimberPro',
    material: 'Solid Mahogany',
    price: 345,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1656733911001-16912b79d2bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWhvZ2FueSUyMHdvb2R8ZW58MXx8fHwxNzY0NzYwMTEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    name: 'Bamboo Composite Boards',
    category: 'wood',
    brand: 'EcoWood',
    material: 'Engineered Bamboo',
    price: 225,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1709225569191-9744de28c580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBtYXRlcmlhbHxlbnwxfHx8fDE3NjQ3NjAxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },

  // Stone Products
  {
    id: 7,
    name: 'Carrara Marble Countertops',
    category: 'stone',
    brand: 'StoneWorks',
    material: 'Natural Stone',
    price: 485,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1659362549741-c32157cc71f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJyYXJhJTIwbWFyYmxlfGVufDF8fHx8MTc2NDc2MDExM3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 8,
    name: 'Black Galaxy Granite Slabs',
    category: 'stone',
    brand: 'StoneWorks',
    material: 'Natural Granite',
    price: 395,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGdyYW5pdGV8ZW58MXx8fHwxNzY0Njc5NTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 9,
    name: 'Travertine Floor Tiles',
    category: 'stone',
    brand: 'StoneWorks',
    material: 'Natural Travertine',
    price: 295,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1755770355297-1526e33a3c82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZXJ0aW5lJTIwc3RvbmV8ZW58MXx8fHwxNzY0NjgxMTM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 10,
    name: 'Sandstone Wall Cladding',
    category: 'stone',
    brand: 'RockSolid',
    material: 'Natural Sandstone',
    price: 265,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1616980540482-394861a86a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kc3RvbmUlMjB3YWxsfGVufDF8fHx8MTc2NDc2MDExNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 11,
    name: 'Limestone Bathroom Tiles',
    category: 'stone',
    brand: 'StoneWorks',
    material: 'Natural Limestone',
    price: 225,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1648639035105-6bce23c55b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW1lc3RvbmUlMjB0ZXh0dXJlfGVufDF8fHx8MTc2NDc2MDExNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 12,
    name: 'Quartzite Kitchen Counters',
    category: 'stone',
    brand: 'RockSolid',
    material: 'Natural Quartzite',
    price: 425,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1616022418141-3b928810549f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFydHppdGUlMjBjb3VudGVydG9wfGVufDF8fHx8MTc2NDc2MDExNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },

  // Metal Products
  {
    id: 13,
    name: 'Brushed Steel Wall Panels',
    category: 'metal',
    brand: 'MetalMaster',
    material: 'Stainless Steel',
    price: 325,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1667660664335-f026a2614577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVzaGVkJTIwc3RlZWwlMjBtZXRhbHxlbnwxfHx8fDE3NjQ3NjAxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 14,
    name: 'Copper Accent Wall Panels',
    category: 'metal',
    brand: 'MetalMaster',
    material: 'Brushed Copper',
    price: 425,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1616022418141-3b928810549f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3BwZXIlMjBtZXRhbCUyMHN1cmZhY2V8ZW58MXx8fHwxNzY0NzYwMTE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 15,
    name: 'Aluminum Composite Sheets',
    category: 'metal',
    brand: 'AlumaPro',
    material: 'Aluminum Composite',
    price: 195,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1758998256408-ab2c9fbec19b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHVtaW51bSUyMHBhbmVsfGVufDF8fHx8MTc2NDc2MDExNnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 16,
    name: 'Bronze Decorative Panels',
    category: 'metal',
    brand: 'MetalMaster',
    material: 'Solid Bronze',
    price: 545,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1744035858093-d8de2d27ec15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9uemUlMjBtZXRhbCUyMHRleHR1cmV8ZW58MXx8fHwxNzY0NzYwMTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 17,
    name: 'Galvanized Steel Roofing',
    category: 'metal',
    brand: 'SteelTech',
    material: 'Galvanized Steel',
    price: 165,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1637099709959-092871814284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWx2YW5pemVkJTIwc3RlZWx8ZW58MXx8fHwxNzY0NzYwMTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 18,
    name: 'Titanium Facade Cladding',
    category: 'metal',
    brand: 'MetalMaster',
    material: 'Titanium Alloy',
    price: 785,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1729886080754-83e26df26a76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXRhbml1bSUyMG1ldGFsfGVufDF8fHx8MTc2NDc2MDExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },

  // Glass Products
  {
    id: 19,
    name: 'Frosted Glass Partition Dividers',
    category: 'glass',
    brand: 'ClearView',
    material: 'Tempered Glass',
    price: 195,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1658604663578-04634f4cb897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcm9zdGVkJTIwZ2xhc3N8ZW58MXx8fHwxNzY0NzYwMTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 20,
    name: 'Laminated Safety Glass',
    category: 'glass',
    brand: 'ClearView',
    material: 'Laminated Glass',
    price: 245,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1562408589-4b96d09ec657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW1pbmF0ZWQlMjBnbGFzc3xlbnwxfHx8fDE3NjQ3NjAxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 21,
    name: 'Tinted Window Glass',
    category: 'glass',
    brand: 'GlassPro',
    material: 'Tinted Glass',
    price: 175,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1714203101091-8c5443797437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aW50ZWQlMjB3aW5kb3clMjBnbGFzc3xlbnwxfHx8fDE3NjQ3NjAxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 22,
    name: 'Low-E Energy Glass',
    category: 'glass',
    brand: 'ClearView',
    material: 'Low-E Glass',
    price: 285,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1751821535460-bf944d3489a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBlZmZpY2llbnQlMjBnbGFzc3xlbnwxfHx8fDE3NjQ3NjAxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 23,
    name: 'Textured Privacy Glass',
    category: 'glass',
    brand: 'GlassPro',
    material: 'Patterned Glass',
    price: 215,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1673629914875-d8fd33f7d9fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0dXJlZCUyMGdsYXNzfGVufDF8fHx8MTc2NDc2MDExOHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 24,
    name: 'Colored Stained Glass Panels',
    category: 'glass',
    brand: 'ArtGlass',
    material: 'Stained Glass',
    price: 395,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1632230997264-b2bfc65cb8b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFpbmVkJTIwZ2xhc3N8ZW58MXx8fHwxNzY0NzYwMTE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },

  // Ceramic Products
  {
    id: 25,
    name: 'Italian Porcelain Floor Tiles',
    category: 'ceramic',
    brand: 'CeramicPro',
    material: 'Glazed Ceramic',
    price: 145,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1617887021567-fe8d2480bd96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JjZWxhaW4lMjB0aWxlc3xlbnwxfHx8fDE3NjQ3NjAxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 26,
    name: 'Subway Ceramic Wall Tiles',
    category: 'ceramic',
    brand: 'TileWorks',
    material: 'Glazed Ceramic',
    price: 95,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1707619781310-ddfc429367ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ3YXklMjB0aWxlc3xlbnwxfHx8fDE3NjQ3NjAxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 27,
    name: 'Mosaic Ceramic Backsplash',
    category: 'ceramic',
    brand: 'CeramicPro',
    material: 'Mosaic Tiles',
    price: 165,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1660029761445-49d108930691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NhaWMlMjB0aWxlc3xlbnwxfHx8fDE3NjQ3NjAxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 28,
    name: 'Terracotta Roof Tiles',
    category: 'ceramic',
    brand: 'ClayMaster',
    material: 'Terracotta Clay',
    price: 125,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1623062284286-febaf4f87d0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwdGlsZXN8ZW58MXx8fHwxNzY0NzYwMTIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 29,
    name: 'Large Format Porcelain Slabs',
    category: 'ceramic',
    brand: 'CeramicPro',
    material: 'Porcelain',
    price: 195,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1673436765927-2c94b9705f5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMHBvcmNlbGFpbiUyMHNsYWJzfGVufDF8fHx8MTc2NDc2MDEyMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 30,
    name: 'Decorative Ceramic Hexagon Tiles',
    category: 'ceramic',
    brand: 'TileWorks',
    material: 'Glazed Ceramic',
    price: 135,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1616080794852-ee44c95d64e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXhhZ29uJTIwdGlsZXN8ZW58MXx8fHwxNzY0NzYwMTIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },

  // Composite Products
  {
    id: 31,
    name: 'Weather-Resistant Composite Decking',
    category: 'composite',
    brand: 'DeckTech',
    material: 'Wood-Plastic Composite',
    price: 165,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1744235558674-89a6ed881268?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wb3NpdGUlMjBkZWNraW5nfGVufDF8fHx8MTc2NDc2MDEyMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 32,
    name: 'High-Density Composite Panels',
    category: 'composite',
    brand: 'CompositePro',
    material: 'HPL Composite',
    price: 215,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1719381502989-f5c050611bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wb3NpdGUlMjBwYW5lbHN8ZW58MXx8fHwxNzY0NzYwMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 33,
    name: 'Fiber Cement Siding Boards',
    category: 'composite',
    brand: 'FiberTech',
    material: 'Fiber Cement',
    price: 145,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1747103068995-e6db935a922b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWJlciUyMGNlbWVudCUyMHNpZGluZ3xlbnwxfHx8fDE3NjQ3NjAxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 34,
    name: 'Engineered Quartz Surfaces',
    category: 'composite',
    brand: 'QuartzMaster',
    material: 'Engineered Quartz',
    price: 325,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1616596612351-5a7ae04e2840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFydHolMjBjb3VudGVydG9wfGVufDF8fHx8MTc2NDc2MDEyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 35,
    name: 'Recycled Composite Flooring',
    category: 'composite',
    brand: 'EcoComposite',
    material: 'Recycled Composite',
    price: 125,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1535981444082-2a5dc0548ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xlZCUyMG1hdGVyaWFsfGVufDF8fHx8MTc2NDc2MDEyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 36,
    name: 'UV-Resistant Composite Cladding',
    category: 'composite',
    brand: 'DeckTech',
    material: 'UV-Resistant WPC',
    price: 185,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1763462980602-07eb86874ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwY29tcG9zaXRlJTIwY2xhZGRpbmd8ZW58MXx8fHwxNzY0NzYwMTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },

  // Fabric Products
  {
    id: 37,
    name: 'Premium Acoustic Fabric Panels',
    category: 'fabric',
    brand: 'SoundBlock',
    material: 'Polyester Fiber',
    price: 125,
    unit: 'panel',
    image: 'https://images.unsplash.com/photo-1622936480196-e70e6285a45c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY291c3RpYyUyMGZhYnJpYyUyMHBhbmVsc3xlbnwxfHx8fDE3NjQ3NjAxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 38,
    name: 'Upholstery Grade Vinyl Fabric',
    category: 'fabric',
    brand: 'FabricPro',
    material: 'Commercial Vinyl',
    price: 85,
    unit: 'yard',
    image: 'https://images.unsplash.com/photo-1693592398532-cb18d3b01d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHVwaG9sc3RlcnklMjBmYWJyaWN8ZW58MXx8fHwxNzY0NzYwMTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 39,
    name: 'Outdoor Sunbrella Fabric',
    category: 'fabric',
    brand: 'OutdoorTex',
    material: 'Acrylic Fabric',
    price: 95,
    unit: 'yard',
    image: 'https://images.unsplash.com/photo-1651594861693-c51e255c7554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwc3VuYnJlbGxhJTIwZmFicmljfGVufDF8fHx8MTc2NDc2MDEyNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 40,
    name: 'Blackout Curtain Fabric',
    category: 'fabric',
    brand: 'WindowWorks',
    material: 'Blackout Polyester',
    price: 65,
    unit: 'yard',
    image: 'https://images.unsplash.com/photo-1655137673627-2ed098d729bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFja291dCUyMGN1cnRhaW58ZW58MXx8fHwxNzY0NzYwMTI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 41,
    name: 'Fire-Retardant Wall Fabric',
    category: 'fabric',
    brand: 'SafeTex',
    material: 'FR Polyester',
    price: 145,
    unit: 'yard',
    image: 'https://images.unsplash.com/photo-1609967804992-c9ad515d6049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwcmV0YXJkYW50JTIwZmFicmljfGVufDF8fHx8MTc2NDc2MDEyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 42,
    name: 'Decorative Stretch Ceiling Fabric',
    category: 'fabric',
    brand: 'CeilingPro',
    material: 'PVC Stretch Fabric',
    price: 115,
    unit: 'sq ft',
    image: 'https://images.unsplash.com/photo-1641209625727-77144b052b29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJldGNoJTIwY2VpbGluZyUyMGZhYnJpY3xlbnwxfHx8fDE3NjQ3NjAxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function MaterialsSection() {
  const [selectedCategory, setSelectedCategory] = useState('wood');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter(p => p.category === selectedCategory);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-transparent to-transparent dark:from-gray-900/30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10"
        >
          <div>
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl text-[#101828] dark:text-white mb-2 sm:mb-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Materials that you will Like
            </motion.h2>
            <motion.p 
              className="text-sm sm:text-base text-[#4a5565] dark:text-gray-400"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Discover premium materials for your next project
            </motion.p>
          </div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ x: 10, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 sm:gap-3 text-[#101828] dark:text-white hover:text-[#FF6A3D] transition-colors group self-start sm:self-auto"
          >
            <span className="uppercase tracking-wider text-xs sm:text-sm">View All</span>
            <div className="p-2 sm:p-2.5 border-2 border-[#d1d5dc] dark:border-gray-700 group-hover:border-[#FF6A3D] rounded-sm transition-colors">
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </motion.button>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex flex-wrap gap-6 sm:gap-8">
            {materialCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                onClick={() => setSelectedCategory(category.id)}
                whileTap={{ scale: 0.98 }}
                className={`pb-2 transition-all duration-300 text-sm uppercase tracking-wider relative ${
                  selectedCategory === category.id
                    ? 'text-[#FF6A3D]'
                    : 'text-[#4a5565] dark:text-gray-400 hover:text-[#FF6A3D]'
                }`}
              >
                {category.label}
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6A3D]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Products Horizontal Scroll */}
        <div className="relative group/scroll">
          {/* Left Arrow */}
          <motion.button
            onClick={() => scroll('left')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-[#FF6A3D] transition-colors duration-300 shadow-lg -translate-x-1/2 group"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </motion.button>

          {/* Right Arrow */}
          <motion.button
            onClick={() => scroll('right')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-[#FF6A3D] transition-colors duration-300 shadow-lg translate-x-1/2 group"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </motion.button>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-shrink-0 w-[280px] sm:w-[320px] group cursor-pointer bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-[#e5e7eb] dark:border-gray-800 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[4/3]">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Heart Icon */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 right-3 w-10 h-10 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:bg-[#FF6A3D] hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </motion.button>
                </div>
                
                {/* Product Details */}
                <div className="p-4 space-y-2">
                  {/* Brand */}
                  <p className="text-xs uppercase tracking-wider text-[#4a5565] dark:text-gray-400">
                    {product.brand}
                  </p>


                  {/* Product Name */}
                  <h3 className="text-[#101828] dark:text-white group-hover:text-[#FF6A3D] transition-colors duration-300 leading-tight line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl text-[#101828] dark:text-white">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-[#4a5565] dark:text-gray-400">
                      / {product.unit}
                    </span>
                    <span className="text-sm text-[#4a5565] dark:text-gray-400 line-through ml-1">
                      ₹{Math.round(product.price * 1.8)}
                    </span>
                  </div>

                  {/* Discount Badge */}
                  <div className="inline-block">
                    <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                      {Math.round(((product.price * 1.8 - product.price) / (product.price * 1.8)) * 100)}% OFF
                    </span>
                  </div>

                  {/* Specifications */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-[#4a5565] dark:text-gray-400 rounded">
                      600x600mm
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-[#4a5565] dark:text-gray-400 rounded">
                      18mm
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-[#4a5565] dark:text-gray-400 rounded">
                      Polished
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}