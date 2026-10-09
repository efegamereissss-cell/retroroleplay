import React from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  Skull, 
  Scale, 
  HeartHandshake, 
  Cpu, 
  Activity, 
  Sparkles,
  Zap
} from 'lucide-react';

const bentoItems = [
  {
    id: 'economy',
    title: 'Sıfırdan Dengelenmiş Yaşayan Ekonomi',
    subtitle: 'Enflasyonsuz, Emeğe Dayalı Piyasa',
    desc: 'Hızlı zenginleşmenin imkansız olduğu, her bir doların arkasında gerçek bir rol emeğinin yattığı gerçekçi finansal döngü. Dinamik vergilendirme ve serbest piyasa.',
    icon: Coins,
    badge: 'Ekonomi v1.0',
    color: 'from-amber-500/10 to-orange-500/5',
    borderColor: 'hover:border-amber-400',
    iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
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
    desc: 'Yasaklı madde sentezleme, sokak çeteleri arasındaki bölge hakimiyeti ve organize suç sendikaları. Her baskın kalıcı karakter kaybı (CK) riski taşır.',
    icon: Skull,
    badge: 'Organize Suç',
    color: 'from-rose-500/10 to-red-500/5',
    borderColor: 'hover:border-rose-400',
    iconColor: 'text-rose-600 bg-rose-50 border-rose-200',
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
    desc: 'Los Santos Polis Departmanı ve Yüksek Mahkeme entegrasyonu. Balistik kovan eşleme, parmak izi analizi, avukat savunmaları ve gerçekçi mahkeme süreçleri.',
    icon: Scale,
    badge: 'Hukuk & Kolluk',
    color: 'from-blue-500/10 to-indigo-500/5',
    borderColor: 'hover:border-blue-400',
    iconColor: 'text-blue-600 bg-blue-50 border-blue-200',
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
    color: 'from-cyan-500/10 to-teal-500/5',
    borderColor: 'hover:border-cyan-400',
    iconColor: 'text-cyan-700 bg-cyan-50 border-cyan-200',
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
    subtitle: 'Serbest Giriş & Karakter Hikayesi',
    desc: 'Herhangi bir whitelist bekleme süresi olmadan doğrudan oyuna katılın! FearRP (Hayat Değeri), CK (Karakter Ölümü) ve katı Metagaming / Powergaming denetimi.',
    icon: HeartHandshake,
    badge: 'Serbest Giriş',
    color: 'from-purple-500/10 to-violet-500/5',
    borderColor: 'hover:border-purple-400',
    iconColor: 'text-purple-600 bg-purple-50 border-purple-200',
    colSpan: 'md:col-span-1',
    metrics: [
      { label: 'Giriş İzni', val: 'Anında Serbest Katılım' },
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
    color: 'from-emerald-500/10 to-green-500/5',
    borderColor: 'hover:border-emerald-400',
    iconColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
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
    <section id="systems" className="relative py-28 px-4 max-w-7xl mx-auto bg-transparent">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-blue-700 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>SUNUCU MEKANİKLERİ VE SİSTEMLER</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight mb-4"
        >
          Apple Sadeliğinde. <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 bg-clip-text text-transparent">
            MTA'nın En Gelişmiş Hard RP Mimarisi.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#6e6e73] text-sm sm:text-base leading-relaxed"
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
              className={`${item.colSpan} relative rounded-3xl bg-white p-7 sm:p-8 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ${item.borderColor} transition-all duration-300 overflow-hidden group flex flex-col justify-between`}
            >
              {/* Subtle Ambient Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>

              {/* Top Row: Icon & Badge */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <div className={`p-3.5 rounded-2xl border ${item.iconColor} shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                  {item.badge}
                </span>
              </div>

              {/* Center Content */}
              <div className="relative z-10 mb-8">
                <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Metrics Pill Bar */}
              <div className="relative z-10 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {item.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                      {metric.label}
                    </span>
                    <span className="text-xs font-bold font-mono text-[#1d1d1f] mt-0.5">
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
