import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Wallpaper {
  id: number;
  title: string;
  category: string;
  tags: string[];
  image: string;
}

const wallpapers: Wallpaper[] = [
  { id: 1, title: 'Abstract Flow', category: 'Абстракция', tags: ['gradient', 'abstract', 'purple', 'blue'], image: 'https://cdn.poehali.dev/projects/1da4a4b1-2aba-4836-961b-394a0d225cd3/files/72fbae8b-4b9c-42ec-9adf-d52bdbd249a4.jpg' },
  { id: 2, title: 'Cosmic Nebula', category: 'Космос', tags: ['space', 'nebula', 'stars', 'cosmic'], image: 'https://cdn.poehali.dev/projects/1da4a4b1-2aba-4836-961b-394a0d225cd3/files/bbc96856-910c-45a1-89c6-0209bc7d03e4.jpg' },
  { id: 3, title: 'Minimal Geometry', category: 'Минимализм', tags: ['minimal', 'geometric', 'neon', 'modern'], image: 'https://cdn.poehali.dev/projects/1da4a4b1-2aba-4836-961b-394a0d225cd3/files/62877985-cdf4-4ed0-aa59-f16e426a61ff.jpg' },
  { id: 4, title: 'Mountain Sunset', category: 'Природа', tags: ['mountain', 'sunset', 'landscape', 'nature'], image: 'https://cdn.poehali.dev/projects/1da4a4b1-2aba-4836-961b-394a0d225cd3/files/9192c3e1-bff0-451e-ba1b-b64828a92bff.jpg' },
  { id: 5, title: 'Ocean Waves', category: 'Природа', tags: ['ocean', 'water', 'beach', 'tropical'], image: 'https://cdn.poehali.dev/projects/1da4a4b1-2aba-4836-961b-394a0d225cd3/files/2e6fd59a-461a-4bf8-bc90-847b01d11b00.jpg' },
  { id: 6, title: 'Forest Path', category: 'Природа', tags: ['forest', 'trees', 'green', 'nature'], image: 'https://cdn.poehali.dev/projects/1da4a4b1-2aba-4836-961b-394a0d225cd3/files/e4b67796-33dc-4225-babb-ca3c79469ed6.jpg' },
  { id: 7, title: 'City Lights', category: 'Город', tags: ['city', 'night', 'neon', 'cyberpunk'], image: 'https://cdn.poehali.dev/projects/1da4a4b1-2aba-4836-961b-394a0d225cd3/files/a34921db-238c-42d4-a7d0-44f8ebfb2ad3.jpg' },
  { id: 8, title: 'Liquid Gold', category: 'Абстракция', tags: ['liquid', 'gold', 'luxury', 'abstract'], image: 'https://cdn.poehali.dev/projects/1da4a4b1-2aba-4836-961b-394a0d225cd3/files/438dbcfa-92b5-4c79-8161-9a148ca50dea.jpg' },
];

const categories = ['Все', 'Космос', 'Абстракция', 'Минимализм', 'Природа', 'Город'];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredWallpapers = wallpapers.filter((wallpaper) => {
    const matchesSearch = 
      wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wallpaper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Все' || wallpaper.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              WallHub
            </h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Icon name="Heart" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Download" size={20} />
              </Button>
            </div>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              placeholder="Поиск по ключевым словам и тегам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-muted/50 border-border"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8 justify-center animate-fade-in">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200 hover:scale-105"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredWallpapers.map((wallpaper, index) => (
            <div
              key={wallpaper.id}
              className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={wallpaper.image}
                  alt={wallpaper.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-semibold mb-2">{wallpaper.title}</h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {wallpaper.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Icon name="Download" size={16} className="mr-2" />
                    Скачать
                  </Button>
                  <Button size="sm" variant="outline">
                    <Icon name="Heart" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredWallpapers.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить поисковый запрос</p>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 WallHub. Коллекция обоев для вашего рабочего стола</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;