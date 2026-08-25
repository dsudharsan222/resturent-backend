import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServicesService } from './services/services.service';

const SERVICES_DATA = [
  { id: 'wedding', name: 'Wedding Catering', capacity: '200 to 1,500 Guests', path: '/catering/wedding', description: 'Comprehensive wedding day catering across multiple traditions including Telugu, Hyderabadi, and North Indian.' },
  { id: 'engagement', name: 'Engagement (Nischitartham)', capacity: '50 to 300 Guests', path: '/catering/engagement', description: 'Intimate and elegant catering for engagement ceremonies with a mix of traditional and modern live counters.' },
  { id: 'sangeet', name: 'Sangeet (Music night)', capacity: '100 to 400 Guests', path: '/catering/sangeet', description: 'Live-counter heavy menus including chaat, dosa, and mocktails for a vibrant evening of music and dance.' },
  { id: 'mehandi', name: 'Mehandi (Henna ceremony)', capacity: '30 to 150 Guests', path: '/catering/mehandi', description: 'Daytime, women-led ceremony grazing spread. Lighter veg menu with chaat counters on request.' },
  { id: 'gruhapravesham', name: 'Gruhapravesham', capacity: '50 to 200 Guests', path: '/catering/gruhapravesham', description: 'Traditional housewarming catering featuring pure sattvic veg menus and banana-leaf seated service.' },
  { id: 'shashtipoorthi', name: 'Shashtipoorthi', capacity: '50 to 200 Guests', path: '/catering/shashtipoorthi', description: '60th birthday celebrations with traditional, easily digestible, and premium authentic menus.' },
  { id: 'corporate', name: 'Corporate Events', capacity: '50 to 1000 Guests', path: '/catering/corporate', description: 'Professional buffets, high-tea, and lunch boxes for office parties, seminars, and corporate gatherings.' },
  { id: 'pelli-koduku', name: 'Pelli Koduku (Groom)', capacity: '50 to 200 Guests', path: '/catering/pelli-koduku', description: 'Sattvic veg by tradition for the grooms pre-wedding rituals.' },
  { id: 'pelli-kuuturu', name: 'Pelli Kuuturu (Bride)', capacity: '50 to 200 Guests', path: '/catering/pelli-kuuturu', description: 'Sattvic veg by tradition for the brides pre-wedding rituals.' },
  { id: 'anniversary', name: 'Wedding Anniversary', capacity: '30 to 200 Guests', path: '/catering/anniversary', description: 'Celebratory menus featuring live counters, premium starters, and customized desserts.' },
  { id: 'satyanarayana-vratam', name: 'Satyanarayana Vratam', capacity: '30 to 150 Guests', path: '/catering/satyanarayana-vratam', description: 'Pure sattvic offerings timed perfectly for the conclusion of the pooja.' },
  { id: 'namakaranam', name: 'Naming (Namakaranam)', capacity: '50 to 150 Guests', path: '/catering/namakaranam', description: 'Joyful family gatherings with crowd-pleasing menus for all ages.' },
  { id: 'uyyala-function', name: 'Uyyala Function', capacity: '30 to 100 Guests', path: '/catering/uyyala-function', description: 'Cradle ceremony catering with traditional sweets and snacks.' },
  { id: 'vadi-biyyam', name: 'Vadi Biyyam', capacity: '30 to 150 Guests', path: '/catering/vadi-biyyam', description: 'Parental blessing ceremony catering with rich traditional meals.' },
  { id: 'annaprasanna', name: 'Annaprasanna', capacity: '30 to 100 Guests', path: '/catering/annaprasanna', description: 'First-rice ceremony catering.' },
  { id: 'vodugu', name: 'Vodugu (Upanayanam)', capacity: '50 to 200 Guests', path: '/catering/vodugu', description: 'Sacred thread ceremony catering featuring strict sattvic preparations.' },
  { id: 'seemantham', name: 'Seemantham', capacity: '50 to 150 Guests', path: '/catering/seemantham', description: 'Baby shower catering with a focus on traditional delicacies and cravings.' },
  { id: 'pasupu-kumkum', name: 'Pasupu Kumkum', capacity: '30 to 100 Guests', path: '/catering/pasupu-kumkum', description: 'Traditional gathering catering.' },
  { id: 'chinna-karma', name: 'Chinna Karma', capacity: '50 to 200 Guests', path: '/catering/chinna-karma', description: 'Respectful, traditional catering for post-death rituals.' },
  { id: 'pedda-karma', name: 'Pedda Karma', capacity: '100 to 500 Guests', path: '/catering/pedda-karma', description: 'Major post-death ritual catering with specific traditional dietary observances.' },
  { id: 'aabdikam', name: 'Aabdikam (Tithi)', capacity: '20 to 50 Guests', path: '/catering/aabdikam', description: 'Death anniversary catering.' },
  { id: 'banti-bojanam', name: 'Banti Bojanam', capacity: '100 to 1000 Guests', path: '/catering/banti-bojanam', description: 'Traditional banana-leaf seated row service for any large gathering.' },
  { id: 'festival', name: 'Festival Catering', capacity: '50 to 500 Guests', path: '/catering/festival', description: 'Specialized menus for Diwali, Sankranti, Dasara, and other major festivals.' },
  { id: 'film-launch', name: 'Movie Opening', capacity: '100 to 1000 Guests', path: '/catering/film-launch', description: 'High-profile catering for audio launches and movie openings.' },
  { id: 'store-opening', name: 'Store Opening', capacity: '50 to 500 Guests', path: '/catering/store-opening', description: 'Impressive spreads to welcome your first customers.' },
  { id: 'birthday', name: 'Birthday Parties', capacity: '30 to 300 Guests', path: '/catering/birthday', description: 'Fun menus with kid-friendly options and live dessert counters.' },
  { id: 'other', name: 'Other Events', capacity: 'Custom', path: '/catering/other', description: 'Customized catering for any event not listed above.' }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const servicesService = app.get(ServicesService);

  console.log('Seeding Catering Services...');

  let added = 0;
  for (const srv of SERVICES_DATA) {
    try {
      // Check if exists
      const exists = await servicesService.findOne(srv.id).catch(() => null);
      if (!exists) {
        await servicesService.create({
          id: srv.id,
          name: srv.name,
          description: srv.description,
          capacity: srv.capacity,
          path: srv.path,
          image_url: `https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=400`, // Default placeholder
          benefits: ['Premium Setup', 'Authentic Taste', 'Hygiene First'],
          menu_options: ['Traditional Veg', 'Premium Non-Veg']
        });
        console.log(`+ Added: ${srv.name}`);
        added++;
      } else {
        console.log(`- Skipped: ${srv.name} (Already exists)`);
      }
    } catch (err) {
      console.error(`x Error adding ${srv.name}:`, err.message);
    }
  }

  console.log(`Seeding complete. Added ${added} new services.`);
  await app.close();
}

bootstrap();
