import React from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  Skull, 
  ShieldAlert, 
  HeartHandshake, 
  Cpu, 
  Activity, 
  Layers, 
  Radio, 
  BadgeCheck, 
  Sparkles,
  Car,
  Scale
} from 'lucide-react';

const bentoItems = [
  {
    id: 'economy',
    title: 'Sıfırdan Dengelenmiş Yaşayan Ekonomi',
    subtitle: 'Enflasyonsuz, Emeğe Dayalı Piyasa',
    desc: 'Hızlı zenginleşmenin imkansız olduğu, her bir doların arkasında gerçek bir rol emeğinin yattığı gerçekçi finansal döngü. Dinamik vergilendirme, borsa dalgalanmaları ve mülk piyasası.',
    icon: Coins,
    badge: 'Ekonomi v1.0',
    color: 'from-amber-500/20 to-orange-500/5',
    borderColor: 'hover:border-amber-500/40',
    iconColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    colSpan: 'md:col-span-2',
    metrics: [
      { label: 'Minimum Ücret', val: '$14 / Saat' },
      { label: 'Enflasyon', val: '%0.0 Dengeli' },
      { label: 'Kredi / Faiz', val: 'Merkez Bankası Kontrollü' }
    ]
  },
  {
    id: 'underworld',
    title: 'Yeraltı & İllegal Hiyerarşi',
    subtitle: 'Kalıcı Sonuçlar Doğuran Riskler',
    desc: 'Yasaklı madde sentezleme, sokak çeteleri arasındaki bölge hakimiyeti ve organize suç sendikaları. Her baskın ve çatışma kalıcı karakter kaybı (CK) riski taşır.',
    icon: Skull,
    badge: 'Organize Suç',
    color: 'from-rose-500/20 to-red-500/5',
    borderColor: 'hover:border-rose-500/40',
    iconColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    colSpan: 'md:col-span-1',
    metrics: [
      { label: 'Çatışma Riski', val: 'Maksimum' },
      { label: 'Bölge Savaşları', val: 'İnteraktif Harita' }
    ]
  },
  {
    id: 'law',
    title: 'Kamu Düzeni, LSPD & Adalet Sistemi',
    subtitle: 'MDT & Kanıt Odaklı Soruşturmalar',
    desc: 'Los Santos Polis Departmanı ve Yüksek Mahkeme entegrasyonu. Balistik kovan eşleme, parmak izi analizi, avukat savunmaları ve gerçekçi hapis cezaları.',
    icon: Scale,
    badge: 'Hukuk & Kolluk',
    color: 'from-blue-500/20 to-indigo-500/5',
    borderColor: 'hover:border-blue-500/40',
    iconColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    colSpan: 'md:col-span-1',
    metrics: [
      { label: 'MDT Sistemi', val: 'Apple UI Destekli' },
      { label: 'Yargı Süreci', val: 'Hukuki Savunma' }
    ]
  },
  {
    id: 'mechanics',
    title: 'Özel Script Mimarisi & Gerçekçi Fiziği',
    subtitle: 'MTA İçin Sıfırdan Kodlanmış Altyapı',
    desc: 'Ağırlık ve hacim tabanlı modern envanter, gerçekçi araç süspansiyon ve parça aşınma mekanikleri, frekans bazlı 3D telsiz ve dinamik hava durumu motoru.',
    icon: Cpu,
    badge: 'Sıfırdan Kodlama',
    color: 'from-cyan-500/20 to-teal-500/5',
    borderColor: 'hover:border-cyan-500/40',
    iconColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    colSpan: 'md:col-span-2',
    metrics: [
      { label: 'Envanter', val: 'Grid & Ağırlık Bazlı' },
      { label: 'Araç Fiziği', val: 'Custom Handling' },
      { label: 'Telsiz Motoru', val: '3D Spatial Audio' }
    ]
  },
  {
    id: 'hardrp',
    title: 'Tavizsiz Hard RP Standartları',
    subtitle: 'Karakter Hikayesi & Kalıcı İzler',
    desc: 'FearRP (Hayat Değeri), CK (Karakter Ölümü) ve katı Metagaming / Powergaming denetimi. Sadece bir karakter değil, yaşayan bir kimlik inşa edin.',
    icon: HeartHandshake,
    badge: 'Hard RP Çekirdeği',
    color: 'from-purple-500/20 to-violet-500/5',
    borderColor: 'hover:border-purple-500/40',
    iconColor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    colSpan: 'md:col-span-1',
    metrics: [
      { label: 'Whitelist', val: 'Sesli & Form Mülakatı' },
      { label: 'Tolerans', val: '%0 Katı Kurallar' }
    ]
  },
  {
    id: 'performance',
    title: 'Ultra Optimizasyon & 60+ Sabit FPS',
    subtitle: 'Gereksiz Yüklerden Arındırılmış Temiz Kod',
    desc: 'Bellek sızıntılarını sıfırlayan temiz Lua mimarisi, sıkıştırılmış dokular ve optimize edilmiş LOD seviyeleriyle en yoğun sahnelerde bile pürüzsüz akıcılık.',
    icon: Activity,
    badge: 'Yüksek Performans',
    color: 'from-emerald-500/20 to-green-500/5',
    borderColor: 'hover:border-emerald-500/40',
    iconColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    colSpan: 'md:col-span-2',
    metrics: [
      { label: 'FPS Hedefi', val: '60+ Sabit' },
      { label: 'Bellek Kullanımı', val: '< 1.2 GB RAM' },
      { label: 'Yükleme Süresi', val: '3.4 Saniye' }
    ]
  }
];

export default function FeaturesBento() {
  return (
    <section id="systems" className="relative py-28 px-4 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-white/10 text-xs font-semibold text-cyan-300 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>SUNUCU MEKANİKLERİ VE SİSTEMLER</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4"
        >
          Apple Sadeliğinde. <br />
          <span className="bg-gradient-to-r from-slate-200 via-white to-slate-400 bg-clip-text text-transparent">
            MTA'nın En Gelişmiş Hard RP Mimarisi.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base leading-relaxed"
        >
          Her sistem, oyuncunun rol kalitesini yükseltmek ve gerçek hayat simülasyonunu en üst noktaya taşımak için özel olarak tasarlandı.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {bentoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`${item.colSpan} relative rounded-3xl glass-panel p-7 sm:p-8 border border-white/10 ${item.borderColor} transition-all duration-500 overflow-hidden group flex flex-col justify-between`}
            >
              {/* Subtle Ambient Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

              {/* Top Row: Icon & Badge */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <div className={`p-3.5 rounded-2xl border ${item.iconColor} shadow-inner`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {item.badge}
                </span>
              </div>

              {/* Center Content */}
              <div className="relative z-10 mb-8">
                <span className="text-xs font-semibold text-cyan-400/90 tracking-wide uppercase block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Metrics Pill Bar */}
              <div className="relative z-10 pt-5 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {item.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                      {metric.label}
                    </span>
                    <span className="text-xs font-bold font-mono text-slate-200 mt-0.5">
                      {metric.val}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
