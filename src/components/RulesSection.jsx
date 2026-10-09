import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ChevronDown, 
  ShieldCheck, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

const rulesData = [
  {
    id: 'fearrp',
    title: 'Fear RP (Hayat Değeri ve Korku)',
    badge: 'Kritik Kural',
    tagColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    shortDesc: 'Karakteriniz kendi hayatına gerçek bir insan gibi değer vermek zorundadır. Ölüm tehlikesinde kahramanlık yapılamaz.',
    fullDesc: 'Üzerinize namlu doğrultulmuşken, sayıca dezavantajlıyken veya rehin alındığınızda karakterinizin korku göstermesi ve verilen emirlere uyması zorunludur.',
    goodExample: '2 kişinin silah doğrulttuğu durumda ellerinizi kaldırıp cüzdanınızı uzatmak.',
    badExample: 'Kafanıza silah dayanmışken aniden silah çekip ateş etmeye çalışmak veya kaçmak.'
  },
  {
    id: 'ck',
    title: 'CK (Character Kill - Kalıcı Ölüm)',
    badge: 'Kalıcı Karakter Kaybı',
    tagColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    shortDesc: 'Karakterin yaşam döngüsünün kalıcı olarak son bulmasıdır. CK yiyen bir karakter tekrar canlandırılamaz.',
    fullDesc: 'Ağır çete çatışmaları, organize suç infazları, ölümcül kaza sahneleri veya yönetim onaylı hikaye finallerinde uygulanır. Tüm mal varlığı devlete veya mirasa geçer.',
    goodExample: 'Uzun süreli bir mafya soruşturmasında yakalanıp mahkeme kararıyla idam veya infaz sahnesini kabullenmek.',
    badExample: 'CK yedikten sonra aynı isimle veya intikam amacıyla yeni karakter açıp eski olayları sürdürmek.'
  },
  {
    id: 'powergaming',
    title: 'Powergaming (PG - Gerçek Dışı Güç Kullanımı)',
    badge: 'Fizik & Eylem İhlali',
    tagColor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    shortDesc: 'Gerçek hayatta imkansız olan eylemleri gerçekleştirmek veya karşı tarafa rol şansı tanımamaktır.',
    fullDesc: 'Fizik kurallarını hiçe saymak, kelepçeliyken koşmak, /me komutlarında karşı tarafın eylemini dikte etmek kesinlikle yasaktır.',
    goodExample: '/me cebindeki çakıyı çıkarıp karşıdakinin boğazına doğru savurmayı dener. (Karşıya şans tanır)',
    badExample: '/me adamı tek yumrukta bayıltır ve parasını cebinden alır. (Cevap hakkı tanımaz)'
  },
  {
    id: 'metagaming',
    title: 'Metagaming (MG - Bilgi İhlali)',
    badge: 'OOC Bilgi Aktarımı',
    tagColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    shortDesc: 'OOC (Oyun Dışı) platformlardan (Discord, Twitch, WhatsApp) öğrenilen bilgileri IC (Oyun İçi) kullanmaktır.',
    fullDesc: 'Karakterinizin bizzat gözleriyle görmediği, telsizle duymadığı veya rol içinde öğrenmediği hiçbir bilgi rol sahnesinde kullanılamaz.',
    goodExample: 'Arkadaşınızı bulmak için oyun içi telefonundan arayıp konum sormak.',
    badExample: 'Discord yayınından arkadaşınızın kaçırıldığını görüp çatışma bölgesine polis göndermek.'
  },
  {
    id: 'combatlog',
    title: 'Combat Logging (Rol Bölme / Çıkış)',
    badge: 'Ağır İhlal',
    tagColor: 'text-red-400 bg-red-400/10 border-red-400/20',
    shortDesc: 'Çatışma, polis kovalamacası veya aleyhinize gelişen bir sahnede bilerek oyundan ayrılmaktır.',
    fullDesc: 'Oyun çöktüğü takdirde en geç 5 dakika içinde yetkiliye ve sahnedeki kişilere Discord üzerinden haber vermek ve sahneye geri dönmek zorunludur.',
    goodExample: 'Oyun çökerse Discord Destek odasına girip kaza raporu sunarak sahneye kaldığı yerden devam etmek.',
    badExample: 'Polis arkadan siren çalarken yakalanmamak için oyunu kapatmak.'
  },
  {
    id: 'pk',
    title: 'PK (Player Kill - Sahne Unutma)',
    badge: 'Geçici Bayılma',
    tagColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    shortDesc: 'Karakterin ağır yaralanarak hastanede uyanması ve kendisini yaralayan olayı hatırlamamasıdır.',
    fullDesc: 'PK durumunda son 30 dakikalık sahne unutulur. Sizi vuran kişiye veya o çatışmaya intikam amacıyla geri dönülemez (Revenge Kill yasağı).',
    goodExample: 'Hastaneden çıktıktan sonra kimin vurduğunu hatırlamayıp günlük hayatına devam etmek.',
    badExample: 'Hastaneden uyanır uyanmaz silah alıp vuran kişinin evine intikama gitmek.'
  }
];

export default function RulesSection() {
  const [activeTab, setActiveTab] = useState('fearrp');
  const [expandedId, setExpandedId] = useState(null);

  const selectedRule = rulesData.find((r) => r.id === activeTab) || rulesData[0];

  return (
    <section id="rules" className="relative py-28 px-4 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-white/10 text-xs font-semibold text-purple-300 mb-4"
        >
          <BookOpen className="w-3.5 h-3.5 text-purple-400" />
          <span>HARD RP REHBERİ & PROTOKOLLER</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4"
        >
          Sıfır Tolerans. <br />
          <span className="bg-gradient-to-r from-purple-300 via-pink-200 to-cyan-300 bg-clip-text text-transparent">
            Yüksek Standartlı Rol Kuralları.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-slate-400 text-sm sm:text-base leading-relaxed"
        >
          Retro Roleplay V1'de kalite tesadüf değildir. Bütün oyuncularımızın adil ve sürükleyici bir atmosferde rol yapabilmesi için temel kurallarımız kesindir.
        </motion.p>
      </div>

      {/* Interactive Apple-Style Tabs & Detail Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Rules Navigation Column (Left) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {rulesData.map((rule) => {
            const isActive = activeTab === rule.id;
            return (
              <div
                key={rule.id}
                onClick={() => setActiveTab(rule.id)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isActive 
                    ? 'glass-panel border-cyan-500/40 bg-cyan-950/20 shadow-lg shadow-cyan-500/10' 
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className={`text-base font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {rule.title}
                  </h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${rule.tagColor}`}>
                    {rule.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {rule.shortDesc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Rule Detailed Breakdown Card (Right) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRule.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl relative overflow-hidden"
            >
              {/* Top Accent Pill */}
              <div className="flex items-center justify-between mb-6">
                <span className={`text-xs font-mono font-semibold px-3 py-1 rounded-full border ${selectedRule.tagColor}`}>
                  {selectedRule.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Madde Kodu: #{selectedRule.id.toUpperCase()}-01
                </span>
              </div>

              {/* Title & Detailed Explanation */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {selectedRule.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                {selectedRule.fullDesc}
              </p>

              {/* Correct vs Incorrect Roleplay Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                {/* Do (Correct) */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Örnek Doğru Rol (DO)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedRule.goodExample}
                  </p>
                </div>

                {/* Don't (Incorrect) */}
                <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">
                    <XCircle className="w-4 h-4" />
                    <span>Yasaklı Rol Davranışı (DON'T)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedRule.badExample}
                  </p>
                </div>
              </div>

              {/* Management Note */}
              <div className="mt-6 flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  Bu kuralın ihlali durumunda kanıt kayıtları yetkili ekibimiz tarafından tarafsızca incelenir ve gerekli yaptırım uygulanır.
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
