// ============================================
// SONGS DATA FILE
// Add all your song details here with YouTube links and authors
// ============================================

// Featured YouTube Channel Configuration (Optional)
const FEATURED_YOUTUBE_CHANNEL = {
    name: "Featured Channel",
    url: " https://www.youtube.com/@davidsandeeppallapu", // Replace with your channel URL
    videoIds: [] // Optional: List of video IDs from this channel
};

// Songs List - Add all 626 songs here
const songsList = [
    // Example Song 1 - Copy this structure for each song
    {
        number: 1,
        titleTelugu: "అన్ని కాలంబుల",
        titleEnglish: "Anni Kaalambula",
        author: "బేతాళ జాన్",
        lyrics: {
            telugu: `అన్ని కాలంబుల
నా దేవుడు నాతో ఉన్నాడు
అతడు నన్ను కాపాడుతాడు
నా జీవితంలో ప్రతి క్షణం`,
            english: `In all times
My God is with me
He protects me
Every moment of my life`
        },
        youtubeLinks: [
            "https://www.youtube.com/watch?v=08RCqxN3VEY",
            "https://www.youtube.com/watch?v=U4xpGq7A-gs"
        ]
    },
    
    // Example Song 2
    {
        number: 2,
        titleTelugu: "గానము జేయుడు",
        titleEnglish: "Gaanamu jeyudu",
        author: "విలియం డాసన్",
        lyrics: {
            telugu: `గానము జేయుడు
ప్రభువుకి గానము
ఆనందముగా గానము`,
            english: `Sing a song
Sing to the Lord
Sing joyfully`
        },
        meaning: "A call to sing joyfully to the Lord.",
        summary: "An uplifting hymn encouraging joyful singing to God.",
        youtubeLinks: [
            "https://www.youtube.com/watch?v=5FUePS25kLs"
        ]
    },
    
    // Example Song 3
    {
        number: 3,
        titleTelugu: "యేసు నాయకుడా",
        titleEnglish: "Yesu naayakudaa",
        author: "గొల్లపల్లి నతానియేలు", // Leave empty if author is unknown
        
        youtubeLinks: [
            "https://www.youtube.com/watch?v=aCZUgWLMO5A"
        ]
    },
    {
        number: 4,
        titleTelugu: "దేవ దివ్యానంత ప్రభావ",
        titleEnglish: "Deva divyananta prabhava",
        author: "పురుషోత్తము చౌదరి",
       
        youtubeLinks: [
            "https://www.youtube.com/watch?v=IA6xgma8jsc"]
    },
    {
        number: 5,
        titleTelugu: "నీతి గల యెహోవా",
        titleEnglish: "Neeti gala yehova ",
        author: "పసుపులేటి దావీదు ",
        
        youtubeLinks: [
            "https://youtu.be/_uGNOvsEl0Y?si=8AGSPgnbz42IrtN7"]
    },
    {
        number: 6,
        titleTelugu: "భీకరుండౌ మా యెహోవా",
        titleEnglish: "Bheekarundau maa yehova ",
        author: "Unknown Author ",
        
        youtubeLinks: [
            "https://youtu.be/BvuODCCH05U?si=mTFE2hm3VuDmF1v6"]
    },
    {
        number: 7,
        titleTelugu: " సన్నుతింతుమో ప్రభో ",
        titleEnglish: "sannutintumo prabho ",
        author: "బొంతా సమూయేలు ",
        
        youtubeLinks: [
            "https://www.youtube.com/watch?v=0b7JtQyTmV4"]
    },
    {
        number: 8,
        titleTelugu: "సర్వ శక్తుని స్తోత్రగానము ",
        titleEnglish: "sarva shaktuni strotra ",
        author: "మిక్కిలి సమూయేలు",
        
        youtubeLinks: [
            "https://youtu.be/l0KdBy0ly_o?si=JQJEa4akF3_21mvM"]
    },
    {
        number: 9,
        titleTelugu: "ప్రబలముగనే - ప్రస్తుతించెద",
        titleEnglish: "prabalamugane - prastutinchcheda ",
        author: "చెట్టి భానుమూర్తి ",
        
        youtubeLinks: [
            "https://www.youtube.com/watch?v=RfmPA0VaJoM"]
    },
    {
        number: 10,
        titleTelugu: "ఎంత ప్రేమ ఎంత ప్రేమ ",
        titleEnglish: "yenta prema yenta prema",
        author: "Unknown Author ",
        
        youtubeLinks: [
            "https://youtu.be/owNItu5vccA?si=6Q8C6i4TQzTX_Ord"]
    },
    {
        number: 11,
        titleTelugu: "చూచుచున్నాము నీవైపు  ",
        titleEnglish: "choochu chunnaamu neevaipu",
        author: "పులిపాక జగన్నాధము",
        
        youtubeLinks: [
            "https://www.youtube.com/watch?v=V8nPaTIQ5ho"]
    },
    {
        number: 12,
        titleTelugu: "దేవ సంస్థుతి చెయవే మనసా ",
        titleEnglish: "Deva samsthuti cheyave manasaaa",
        author: "ముంగమూరి దేవదాసు",
        
        youtubeLinks: [
            "https://youtu.be/zs0cy3K3Fic?si=Rgtmr42xOKgyfQfx"]
    },
    {
        number: 13,
        titleTelugu: "నా కాలగతు లెవ్వి ",
        titleEnglish: "  Naa kaala gatulevvi",
        author: "పులిపాక జగన్నాధము",
        
        youtubeLinks: [
            "https://youtu.be/ljU3piaa3CE?si=wHR1xCwJmAkhEIaQ"]
    },
    {
        number: 14,
        titleTelugu: "నాకేమి కొదువ  ",
        titleEnglish: "Naa kemi koduva ",
        author: "ముంగమూరి దేవదాసు ",
        
        youtubeLinks: [
            "https://youtu.be/L9O8zRzCXoU?si=QwhhFO3zmyi7pWen"]
    },
    {
        number: 15,
        titleTelugu: "యెహోవా నా కాపరి ",
        titleEnglish: "yehova na kaapari ",
        author: "సరెళ్ళ సమూయేలు సుబ్బయ్య  ",
        
        youtubeLinks: [
            "https://www.youtube.com/watch?v=nF10wE2nmms&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=17"]
    },
    {
        number: 16,
        titleTelugu: " యెహోవా నా మొఱ లాలించెను   ",
        titleEnglish: "Yehova na mora laalinchenu",
        author: "పురుషోత్తము చౌదరి ",
        
        youtubeLinks: [
            "https://youtu.be/mtDpX8oDvnk?si=3GXi8bifPCzwuFea"]
    },
    {
        number: 17,
        titleTelugu: " యెహోవా భజన చేయండి  ",
        titleEnglish: "yehova bhajana cheyandi ",
        author: "యేసుదాసు నర్సయ్య ",
        youtubeLinks: ["https://youtu.be/o53CISAq560?si=BEbo4VqVUcDgYbI5"]
    },
    {
        number: 18,
        titleTelugu: " కూడికొని యున్నాము  ",
        titleEnglish: "Koodukoni yunnaamu",
        author: "పులిపాక జగన్నాధము",
        youtubeLinks: ["https://www.youtube.com/watch?v=p6sNc2JEHgc&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=21"]
    },  
    {
        number: 19,
        titleTelugu: " చూడ గోరెద   ",
        titleEnglish: "chooda goreda",
        author: "ఎం. జె. రామాంజులు  ",
        
        youtubeLinks: [
            "https://www.youtube.com/watch?v=tlog6vWSLus&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=22"]
    },
    {
        number: 20,
        titleTelugu: "పరిశుద్ధ పరిశుద్ధ ",
        titleEnglish: "parishuddha parishuddha",
        author: "యెషయా వీరమార్టిన్ ",
        
        youtubeLinks: [
            "https://www.youtube.com/watch?v=Rk7MLI7_yUQ&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=23"]
    },
    {
        number:21,
        titleTelugu: "త్రిత్వమై  నిత్యత్వమున ",
        titleEnglish: "tritwamai nityatwamuna",
        author:"Unknown Author ",
        youtubeLinks:[
            "https://www.youtube.com/watch?v=BHP98dWLc1g&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=24"]   
    },
    {
    number:22,
    titleTelugu: "ప్రభుత్వమై  నిత్యత్వమున ",
    titleEnglish: "Vyoma simhasanastuda",
    author:"మిక్కిలి సమూయేలు",
    youtubeLinks:["https://www.youtube.com/watch?v=DoujfoBV6BI&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=25"]   
    },
    {
    number:23,
    titleTelugu: "ఎటుల నీకు స్తుతు లొనర్తుము  ",
    titleEnglish: "yetula neeku stutu lonartumu",
    author:"మాముడూరి సైమన్  ",
    youtubeLinks:["https://youtu.be/L-zCLkFVT-Y?si=AwaIW04TM1HvuuFr"]   
    },
    {
    number:24,
    titleTelugu: " భూమండలము దాని సంపూర్ణతయును  ",
    titleEnglish: "Bhoomandalamu daani sampoornatayunu",
    author:"మల్లెల దావీదు ",
    youtubeLinks:["https://www.youtube.com/watch?v=cKuQtAknMQQ&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=28"]   
    },
    {
    number:25,
    titleTelugu: " పరలోకమున నుండు దేవా   ",
    titleEnglish: "paralokamuna nundu deva",
    author:"పురుషోత్తము చౌదరి ",
    youtubeLinks:["https://www.youtube.com/watch?v=oQU7lYFPwRE&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=29"]   
    },
    {
    number:26,
    titleTelugu: " రండి యుత్సహించి పాడుదము  ",
    titleEnglish: " randi yutsahinchi paadudamu",
    author:"సమూయేలు పాక్యవాధము ",
    youtubeLinks:["https://www.youtube.com/watch?v=zl0F1I9-aaA&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=30"]   
    },
    {
    number:27,
    titleTelugu: " కలుగునుగాక దేవునికి మహిమ  ",
    titleEnglish: "Kalugunugaka devuniki mahima",
    author: "విర్పుల మోషే ",
    youtubeLinks:["https://www.youtube.com/watch?v=D7q9axIEZqs&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=31"]   
    },
    {
    number:28,
    titleTelugu: " మహిమ సర్వన్నతమైన  ",
    titleEnglish: " Mahima sarvonnatamaina",
    author: "బేతాళ జాన్ ",
    youtubeLinks:["https://www.youtube.com/watch?v=YXeJgAspBeM&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=32"]   
    },
    {
    number:29,
    titleTelugu: " పాహిలోక ప్రభో ",
    titleEnglish: " Pahiloka prabho",
    author: "బన్యన్ జోసఫ్  ",
    youtubeLinks:["https://www.youtube.com/watch?v=PFYrPu7u6mo&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=33"]   
    },
    {
    number:30,
    titleTelugu: "మా యేసు క్రీస్తు నీవే ",
    titleEnglish: " Ma yesu kreesthu neeve ",
    author: "సమూయేలు పాక్యవాధము ",
    youtubeLinks:["https://www.youtube.com/watch?v=2stDA2gnCGk&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=34"]   
    },
    {
        number: 31,
        titleTelugu:"ఓ ప్రభుండా నిన్ నుతించు ",
        titleEnglish:"o prabhunda ninu nutinchuu",
        author:" మల్లెల దావీదు",
        youtubeLinks:["https://www.youtube.com/watch?v=Jo66gROxF2Q&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=36"],
    },
    {
        number: 32,
        titleTelugu:"దహన బలి నీకు ననిష్టము ",
        titleEnglish:"Dahana bali niku nanistamu",
        author:"మల్లెల దావీదు",
        youtubeLinks:["https://www.youtube.com/watch?v=fLCWU-4gZYE&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=37"],
    },
    {
        number:33,
        titleTelugu:"యెహోవా గద్దె ముందుగా ",
        titleEnglish:"yehova gadde munduga",
        author:"ఐజక్ వాట్స్",
        youtubeLinks:["https://www.youtube.com/watch?v=Ayau7HC6Qco&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=38"],
    },
    {
        number:34,
        titleTelugu:"సర్వేశా! రమ్ము నీ  ",
        titleEnglish:"sarveswa rammu nee",
        author:"చార్లెస్ వెస్లీ",
        youtubeLinks:["https://www.youtube.com/watch?v=SFYJ53mE_xo&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=40"],
    },
    {
        number:35,
        titleTelugu:" ఇన్నాళ్లు  మాకు  సాయమై ",
        titleEnglish:" innallu maaku saayamai",
        auhtor:"ఐజక్ వాట్స్",
        youtubeLinks:["https://www.youtube.com/watch?v=o_y09wNPKSs&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=41"],
    },
    {
        number:36,
        titleTelugu:"సర్వాద్భుతంబులం ",
        titleEnglish:"sarvaadbhutambulan",
        author:"మార్టిన్ రిన్ కార్ట్",
        youtubeLinks:["https://www.youtube.com/watch?v=SipGYTSMH_I&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=42"],
    },
    {
        number:37,
        titleTelugu: "మాకర్త గట్టి దుర్గము",
        titleEnglish: "maa kartha gatti durgamu",
        author: "మార్టిన్ లూథర్",
        youtubeLinks:["https://www.youtube.com/watch?v=tmJMqiBOeLo&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=43"],
    },
    {
        number:38,
        titleTelugu: "కృపగల దేవుని",
        titleEnglish: "krupa gala devuni ",
        author: "జాన్ మిల్టన్",
        youtubeLinks:["https://www.youtube.com/watch?v=xO2u3J5YfhM&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=44"],
    },
    {
        number:39,
        titleTelugu: "నృపా! విమోచకా!",
        titleEnglish: "Nrupa Vimochaka",
        author: "చార్లెస్ వెస్లీ",
        youtubeLinks:["https://www.youtube.com/watch?v=jns_bNNIe-0&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=45"],
    },
    {
        number:40,
        titleTelugu: "శుద్ధి శుద్ధి శుద్ధి!",
        titleEnglish: "Shuddhi shuddhi Shuddhi!",
        author: "రెజినాల్డ్ హెబర్",
        youtubeLinks:["https://www.youtube.com/watch?v=Fb7j8NDgzpc&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=46"],
    },
    {
        number:41,
        titleTelugu: "మేలుకొనరే",
        titleEnglish: "melukonare",
        author: "మిక్కిలి సమూయేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=dVniLesYkwI&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=47"],
    },
    {
        number:42,
        titleTelugu: "తెల్లవారిన వేళ",
        titleEnglish: "Thellavarina vela",
        author: "పురుషోత్తము చౌధరి",
        youtubeLinks:["https://www.youtube.com/watch?v=AnYVXRbznno&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=48"],
    },
    {
        number:43,
        titleTelugu: "శ్రీ యేసు కర్తను సేవ జేయుటకు మేల్కొను",
        titleEnglish: "Sree yesu karthanu seva jeyutaku melkonu",
        author: "బేతాళ జాన్",
        youtubeLinks:["https://www.youtube.com/watch?v=X4bs_jUrcYk&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=50"],
    },
    {
        number:44,
        titleTelugu: "సకల జగజ్జాల కర్త ",
        titleEnglish: "sakala jagajjala karta",
        author: "విలియం డాసన్",
        youtubeLinks:["https://www.youtube.com/watch?v=EfYjgVZlhsA&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=51"],
    },
    {
        number:45,
        titleTelugu: "వేడెద నాదగు",
        titleEnglish: "Vededa naadagu",
        author: "విలియం డాసన్",
        youtubeLinks:["https://www.youtube.com/watch?v=lzmyzFdQyLc&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=52"],
    },
    {
        number:46,
        titleTelugu: "ప్రభువ నిన్నారదింపను",
        titleEnglish: "prabhuva ninnaradimpanu",
        author: "మొలతాటి విద్యానందము",
        youtubeLinks:["https://www.youtube.com/watch?v=wY2c1YNmcS8&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=54"],
    },
    {
        number:47,
        titleTelugu: "లేచి స్తుతింప బూనుడి",
        titleEnglish: "Lechi stutimpa boonudi ",
        author: "Unknown Author",
        youtubeLinks:["https://www.youtube.com/watch?v=CE6xMVtUry0&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=55"],
    },
    {
        number:48,
        titleTelugu: "స్తోత్రము స్తోత్రము ఓ దేవ",
        titleEnglish: "stotramu stotramu o deva",
        author: "బన్యన్ జోసెఫ్ ",
        youtubeLinks:["https://www.youtube.com/watch?v=46VAgQC13Jc&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=56"],
    },
    {
        number:49,
        titleTelugu: "వినవే నా వినతి",
        titleEnglish: "Vinave naa vinathi",
        author: "మిక్కిలి సమూయేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=5IvBvS2QBE8&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=57"],
    },
    {
        number:50,
        titleTelugu: "దేవ నీకు స్తోత్రము",
        titleEnglish: "deva neeku stotramu",
        author: "మత్తయి సమూయేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=kdnRyeN7z8w&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=58"],
    },
    {
        number:51,
        titleTelugu: "దినము గతియించెను",
        titleEnglish: "dinamu gatiyinchenu",
        author: "దాసరి మోజెస్",
        youtubeLinks:["https://www.youtube.com/watch?v=f3AC2mO0L2M&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=59"],
    },
    {
        number:52,
        titleTelugu: "ఆకాశాంబు భూమియు",
        titleEnglish: "Akashambu bhoomiyu",
        author: "ఏ. చార్లెస్ కిన్సింగర్",
        youtubeLinks:["https://www.youtube.com/watch?v=OaWHAbHeiAU&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=60"],
    },
    {
        number:53,
        titleTelugu: "ఈ సాయంకాలమున",
        titleEnglish: " ee sayankaalamuna",
        author: "మల్లెల దావీదు",
        youtubeLinks:["https://www.youtube.com/watch?v=hbFMPt4QO78&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=61"],
    },
    {
        number:54,
        titleTelugu: "నా యేసు, ఆత్మ సూర్యుడు",
        titleEnglish: "naa yesu aatma suryudaa",
        author: "జాన్ కెబిల్",
        youtubeLinks:["https://www.youtube.com/watch?v=67B4qD-rM7Y&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=62"],
    },
    {
        number:55,
        titleTelugu: "ప్రొద్దు గ్రుంకుచున్నది",
        titleEnglish: "proddu grunkuchunnadi",
        author: "మేరీ లాల్ బరీ",
        youtubeLinks:["https://www.youtube.com/watch?v=NrpwCZA9a8I&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=63"],
    },
    {
        number:56,
        titleTelugu: "రాత్రియయ్యే నన్నెదబాయకు",
        titleEnglish: "Ratri ayye nannedabaayaku",
        author: "హెన్రీ ఫ్రాన్సిస్ లైట్",
        youtubeLinks:["https://www.youtube.com/watch?v=BzIpv1hLRdQ&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=64"],
    },
    {
        number:57,
        titleTelugu: "ఓ రక్షక నీ దివ్య నామము",
        titleEnglish: "o rakshaka nee divya naamamu",
        author: "జాన్ ఎల్లెర్ టన్",
        youtubeLinks:["https://www.youtube.com/watch?v=4ptdRKAvYcQ&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=65"],
    },
    {
        number:58,
        titleTelugu: "ఇది   యెహోవా  కలిగించిన  దినము ",
        titleEnglish: "Idi yehova kaliginchina dinamu",
        author: "పురుషోత్తము చౌధరి",
        youtubeLinks:["https://www.youtube.com/watch?v=8revaO6GRk8&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=66"],
    },
    {
        number:59,
        titleTelugu: "సుక్షేమ శుభ కాల",
        titleEnglish: "sukshema subha kaala",
        author: "క్రిస్టఫర్ వర్డ్స్ వర్త్",
        youtubeLinks:["https://www.youtube.com/watch?v=QYubivfCrAw&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=67"],
    },
    {
        number:60,
        titleTelugu: "గొప్ప దేవ నాకు",
        titleEnglish: "Goppa deva naaku ",
        author: "పులిపాక జగన్నాధము",
        youtubeLinks:["https://www.youtube.com/watch?v=1jRZ15IBgb4&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=68"],
    },
    {
        number:61,
        titleTelugu: "ఘనుడైన యెహోవా గద్దె ముందట",
        titleEnglish: "Ghanudaina yehova gadde mundata",
        author: "విలియం డాసన్",
        youtubeLinks:["https://www.youtube.com/watch?v=1FRNKna-7lI&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=69"],
    },
    {
        number:62,
        titleTelugu: "గతకాలములయందు ",
        titleEnglish: "gatha kaalamulayandu",
        author: "జాన్ చౌధరి",
        youtubeLinks:["https://www.youtube.com/watch?v=v-6eqTlOqr0&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=70"],
    },
    {
        number:63,
        titleTelugu: "పరమపురి కల్పభుజ",
        titleEnglish: " parama puri kalpabhuja",
        author: "పాలపర్తి యాకోబు",
        youtubeLinks:["https://www.youtube.com/watch?v=kFIvCCC6sPU&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=71"],
    },
    {
        number:64,
        titleTelugu: "ఎంత ప్రేమించెనో ",
        titleEnglish: "yenta premincheno",
        author: "చదలవాడ జకర్యా",
        youtubeLinks:["https://www.youtube.com/watch?v=khFayl9b4uU&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=72"],
    },
    {
        number:65,
        titleTelugu: "దేవుని గొప్ప ప్రేమాను",
        titleEnglish: "devuni goppa premanu",
        author: "ఏ. బి. మాసిలామణి",
        youtubeLinks:["https://www.youtube.com/watch?v=JspvyrJG2is&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=73"],
    },
    {
        number:66,
        titleTelugu: "దివ్య ప్రేమ పృధ్విలోన",
        titleEnglish: "dyva prema prudhvilona",
        author: "చార్లెస్ వెస్లీ",
        youtubeLinks:["https://www.youtube.com/watch?v=S2CU_iqUIBw&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=74"],
    },
    {
        number:67,
        titleTelugu: "శాశ్వతుడు విస్మయమొండి",
        titleEnglish: "saashwatuda vismaya",
        author: "కార్ల్ బోబెర్గ్",
        youtubeLinks:["https://www.youtube.com/watch?v=dcGW9NmHtF4&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=75"],
    },
    {
        number:68,
        titleTelugu: "ఘనా భవ",
        titleEnglish: "Ghana bhava",
        author: "మిక్కిలి సమూయేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=wvmxpU6DUA4&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=76"],
    },
    {
        number:69,
        titleTelugu: "సర్వ దేశములారా",
        titleEnglish: "Sarva desamulaara ",
        author: "సరెళ్ళ సమూయేలు సుబ్బయ్య",
        youtubeLinks:["https://www.youtube.com/watch?v=VLWj-FpwRbA&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=77"],
    },
    {
        number:70,
        titleTelugu: "దేవ కుమారా",
        titleEnglish: "Deva kumaara",
        author: "మిక్కిలి సమూయేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=vGuYxO8L2As&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=78"],
    },
    {
        number:71,
        titleTelugu: "నీవు నా దేవుఁడవై యున్నావు ",
        titleEnglish: "Neevu naa devundavai",
        author: "Unknown Author",
        youtubeLinks:["https://www.youtube.com/watch?v=dQ_--g2rDE4&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=79"],
    },
    {
        number:73,
        titleTelugu: "మంగళమే యేసునకు ",
        titleEnglish: "Mangalame yesunaku ",
        author: "పురుషోత్తము చౌధరి",
        youtubeLinks:["https://www.youtube.com/watch?v=z9omq8rQmvw&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=80"],
    },
    {
        number:74,
        titleTelugu: "వందనమే యేసునకు ",
        titleEnglish: "Vandaname Yesunaku",
        author: "పురుషోత్తము చౌధరి",
        youtubeLinks:["https://www.youtube.com/watch?v=X5QBTl7o7d8&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=81"],
    },
    {
        number:75,
        titleTelugu: "మంగళంబని పాదరే",
        titleEnglish: "MANGALAMBANI PAADARE",
        author: "పురుషోత్తము చౌధరి",
        youtubeLinks:["https://www.youtube.com/watch?v=I_Jq-su0Y2I&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=82"],
    },
    {
        number:76,
        titleTelugu: "క్రీస్తు యేసుకు మంగళం",
        titleEnglish: " kreestu yesuku mangalam",
        author: "సి. రవివర్మ",
        youtubeLinks:["https://www.youtube.com/watch?v=b5vrhonv5oA&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=83"],
    },
    {
        number:77,
        titleTelugu: "విజయ గీతముల్ పాదరే",
        titleEnglish: "vijaya geetamul paadare",
        author: "అల్లారి పెదవీరాస్వామి",
        youtubeLinks:["https://www.youtube.com/watch?v=4dloQFccGQA&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=84"],
    },
    {
        number:78,
        titleTelugu: "యేసు భజనయే",
        titleEnglish: "Yesu bhajanaye",
        author: "విలియం డాసన్",
        youtubeLinks:["https://www.youtube.com/watch?v=qRhO0qruEVo&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=85"],
    },
    {
        number:79,
        titleTelugu: "శ్రీ యేసునే భజించు",
        titleEnglish: "Sree yesune bhajinchu",
        author: "యెషయా వీరమార్టిన్",
        youtubeLinks:["https://www.youtube.com/watch?v=DHC0HGYbHus&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=86"],
    },
    {
        number:80,
        titleTelugu: "యేసుని భజియింపవే మనసా",
        titleEnglish: "Yesuni bhajiyimpave manasa ",
        author: "రావూరి లక్ష్మయ్య",
        youtubeLinks:["https://www.youtube.com/watch?v=AuZUD7lGWns&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=87"],
    },
    {
        number:81,
        titleTelugu: "భజనచేయుచు భక్తపాలక",
        titleEnglish: "bhajana cheyuchu bhaktapalaka",
        author: "దొరసామి ఆరోగ్యము",
        youtubeLinks:["https://www.youtube.com/watch?v=Wu9e8K0qsnU&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=88"],
    },{
        number:82,
        titleTelugu: "యేసు భజనసేయవే దోసపుమనసా ",
        titleEnglish: "Yesu bhajana seyave dosapu manasa",
        author: "ఓగిరాల గాబ్రియేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=rneKg0j-RkY&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=89"],
    },{
        number:83,
        titleTelugu: "రారే మన యేసు",
        titleEnglish: " raare mana yesu",
        author: "పురుషోత్తము చౌధరి",
        youtubeLinks:["https://www.youtube.com/watch?v=eRmTqZpCAuo&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=90"],
    },{
        number:84,
        titleTelugu: "ఇదిగో నీతి భాస్కరుండు",
        titleEnglish: "idigo neeti bhaskarundu",
        author: "చెట్టి భానుమూర్తి",
        youtubeLinks:["https://www.youtube.com/watch?v=YXZu34QS0EI&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=91"],
    },
    {
        number:85,
        titleTelugu: "",
        titleEnglish: " ",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:86,
        titleTelugu: "ఏమి నేను సమర్పింతు యేసు ",
        titleEnglish: "yemi nenu samarpinthu yesu",
        author: "పులిపాక జగన్నాధము",
        youtubeLinks:["https://www.youtube.com/watch?v=k7jR_sRRBaM&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=92"],
    },{
        number:87,
        titleTelugu: "సర్వ లోక సం పూజ్య నమో నమో",
        titleEnglish: "Sarvaloka sampoojya namo namo",
        author: "చెట్టి భానుమూర్తి",
        youtubeLinks:["https://www.youtube.com/watch?v=4TkaQyeRlQk&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=93"],
    },{
        number:88,
        titleTelugu: "నమో యేసునాధా",
        titleEnglish: " Namo yesu naadha",
        author: "ఇ. జి. ఆనందము",
        youtubeLinks:["https://www.youtube.com/watch?v=EiwWWkYiIic&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=94"],
    },
    {
        number:89,
        titleTelugu: "",
        titleEnglish: " ",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:90,
        titleTelugu: "క్రీస్తునాయక నీ దయాళిని",
        titleEnglish: "kreestu nee dayalini",
        author: " మిక్కిలి సమూయేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=uWJ8Ah9_VqY&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=95"],
    },{
        number:91,
        titleTelugu: "",
        titleEnglish: "",
        author: "",
        youtubeLinks:[""],
    },{
        number:92,
        titleTelugu: "యేసు పదాంబుజ ",
        titleEnglish: "yesu padaambuja",
        author: "చెట్టి భానుమూర్తి",
        youtubeLinks:["https://www.youtube.com/watch?v=oc56i5ultYo&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=96"],
    },{
        number:93,
        titleTelugu: "దేవాత్మ జయో ",
        titleEnglish: "devaatma jayo",
        author: "చెట్టి భానుమూర్తి",
        youtubeLinks:["https://www.youtube.com/watch?v=qC3AM-yu0D8&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=97"],
    },{
        number:94,
        titleTelugu: "సమానులెవరు ప్రభూ ",
        titleEnglish: "samaanu levaru prabhoo",
        author: "చెట్టి భానుమూర్తి",
        youtubeLinks:["https://www.youtube.com/watch?v=ogS8ibMtyFc&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=98"],
    },{
        number:95,
        titleTelugu: "యేసు క్రీస్తుడు",
        titleEnglish: "yesu kreestudu ",
        author: "గొల్లపల్లి నతానియేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=jUDCWOHsLFc&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=100"],
    },{
        number:96,
        titleTelugu: "దేవుని నీతి ప్రతాపం ",
        titleEnglish: " Devuni neeti",
        author: "ఏ. బి. మాసిలామణి",
        youtubeLinks:["https://www.youtube.com/watch?v=GSGyXYuMeGk&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=101"],
    },{
        number:97,
        titleTelugu: "శ్రీ రక్షకుని నామము ",
        titleEnglish: "sree rakshakuni naamamu",
        author: "ఎడ్వర్డ్  సెర్రోనెట్",
        youtubeLinks:["https://www.youtube.com/watch?v=guTwHpNkYas&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=102"],
    },{
        number:98,
        titleTelugu: "సుందర రక్షకా!",
        titleEnglish: "sundara rakshaka!",
        author: "ఎం. గెసాంగ్ బుచ్",
        youtubeLinks:["https://www.youtube.com/watch?v=1_xrUCay3dc&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=103"],
    },{
        number:99,
        titleTelugu: " స్తుతి స్తుతి సదయుడైన ",
        titleEnglish: "Stuti stuti sadayudaina ",
        author: "ఫేనీ క్రాస్బీ",
        youtubeLinks:["https://www.youtube.com/watch?v=4oZfXmZimKI&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=104"],
    },{
        number:100,
        titleTelugu: "పాపల్ హోసన్నా పాటల్",
        titleEnglish: "paapal hosannaa paatal",
        author: "తియోడల్ఫ్ ఆర్లియన్స్",
        youtubeLinks:["https://www.youtube.com/watch?v=nsjNuAXA4AU&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=105"],
    },
    {
        number:101,
        titleTelugu: "నా ఆత్మ నాలో",
        titleEnglish: "Naa aathma naalo",
        author: "ఎస్. మెడ్లే",
        youtubeLinks:["https://www.youtube.com/watch?v=FllEkd_Atac&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=106"],
    },
    {
        number:102,
        titleTelugu: "మమున్ సృజించిన ",
        titleEnglish: "mamun srujinchina",
        author: "చార్లెస్ వెస్లీ",
        youtubeLinks:["https://www.youtube.com/watch?v=ycEVFXx4vKg&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=107"],
    },
    {
        number:103,
        titleTelugu: "నమస్కరింప రండి",
        titleEnglish: "Namaskarimpa randi",
        author: "జేమ్స్ మాంట్ గోమరీ",
        youtubeLinks:["https://www.youtube.com/watch?v=PHpY6R_gcqM&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=108"],
    },
    {
        number:104,
        titleTelugu: "వినరే యో నరులారా",
        titleEnglish: "vinare yo narulaara ",
        author: "పురుషోత్తము చౌధరి",
        youtubeLinks:["https://www.youtube.com/watch?v=A7dHksnX5g8&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=109"],
    },
    {
        number:105,
        titleTelugu: "రారే గొల్లవారలారా ",
        titleEnglish: "Rare golla varalara",
        author: "Unknown author",
        youtubeLinks:["https://www.youtube.com/watch?v=porAirOpLH0&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=110"],
    },
    {
        number:106,
        titleTelugu: "వచ్చిగాబ్రియేలు పల్కెను",
        titleEnglish:"vachi gaabriyelu palkenu ",
        author: "పురుషోత్తము చౌధరి",
        youtubeLinks:["https://www.youtube.com/watch?v=TmGuhiBZLfA&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=111"],
    },
    {
        number:107,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:108,
        titleTelugu: "కొనియాడ దరమె నిన్ను ",
        titleEnglish:"Koniyada darame ninnu",
        author: "పంతగాని పరదేశి",
        youtubeLinks:["https://www.youtube.com/watch?v=d3rfOHWOokc&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=112"],
    },
    {
        number:109,
        titleTelugu: "చింత లేడిక యేసు పుట్టెను",
        titleEnglish:"chinta ledika",
        author: "ఎన్. డి. ఏబెల్",
        youtubeLinks:["https://www.youtube.com/watch?v=qdy4MTZ1D44&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=113"],
    },
    {
        number:110,
        titleTelugu: "పుట్టే యేసు డు నేడు",
        titleEnglish:"putte yesudu nedu",
        author: "ఫెలిక్స్ ఆండ్రూ",
        youtubeLinks:["https://www.youtube.com/watch?v=tQYCYSVWHTY&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=114"],
    },
    {
        number:111,
        titleTelugu: "ఱేడు  మెస్సియా  జన్మించేను",
        titleEnglish:"Redu messiya janminche",
        author: "ఎస్. జేమ్స్ ",
        youtubeLinks:["https://www.youtube.com/watch?v=Gppta55xLn4&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=115"],
    },
    {
        number:112,
        titleTelugu: " రక్షకుండుదయించినాడట ",
        titleEnglish:" rakshakun dudayinchinaadata",
        author: "మోచర్ల రాఘవయ్య",
        youtubeLinks:["https://www.youtube.com/watch?v=scr4ObE2uhg&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=116"],
    },
    {
        number:113,
        titleTelugu: "సంతోషించుడి అందరు",
        titleEnglish:"Santhoshinchudi andaru",
        author: "బేతాళ జాన్",
        youtubeLinks:["https://www.youtube.com/watch?v=Xitlu1pogIQ&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=117"],
    },
    {
        number:114,
        titleTelugu: "జ్ఞాను లారాధించిరి",
        titleEnglish:"Gnanularadhinchiri",
        author: "బేతాళ జాన్",
        youtubeLinks:["https://www.youtube.com/watch?v=ctF4w09T1uI&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=118"],
    },
    {
        number:115,
        titleTelugu: "గీతములు పాడుడి ",
        titleEnglish:"geetamulu paadudi",
        author: "మురారి దావీదు",
        youtubeLinks:["https://www.youtube.com/watch?v=FAF3MjZqlo8&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=120"],
    },
    {
        number:116,
        titleTelugu: "రారే చూతము ",
        titleEnglish:"Rare choothamu",
        author: "చెట్టి భానుమూర్తి",
        youtubeLinks:["https://www.youtube.com/watch?v=D4O3jheiDjo&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=123"],
    },
    {
        number:117,
        titleTelugu: "యేసునాధుని యోధులందరు ",
        titleEnglish:"Yesunandhuni yodhulandaru",
        author: "మత్తయి సమూయేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=D4O3jheiDjo&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=123"],
    },
    {
        number:118,
        titleTelugu: "మేము వెళ్ళిచూచినాము",
        titleEnglish:"memu velli chuchinaamu",
        author: "Unknown Author",
        youtubeLinks:["https://www.youtube.com/watch?v=48mQJo3DeAI&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=124"],
    },
    {
        number:119,
        titleTelugu: "లోకమంతట వెలుగు ప్రకాశించెను",
        titleEnglish:" Lokamanthata velugu prakashinchenu",
        author: "ఆర్. దేవదాస్", 
        youtubeLinks:["https://www.youtube.com/watch?v=McNch4DE5mM&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=125"],
    },
    {
        number:120,
        titleTelugu: "చుడరే మా ఱేడు పుట్టి",
        titleEnglish:"Choodare maa redu puttinaadu",
        author: "జాన్ చౌధరి",
        youtubeLinks:["https://www.youtube.com/watch?v=-jAztzbF20g&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=126"],
    },
    {
        number:121,
        titleTelugu: "శ్రీ యేసుండు జన్మించే",
        titleEnglish:" Sri yesundu janminche",
        author: "కొమ్ము కృప",
        youtubeLinks:["https://www.youtube.com/watch?v=qAoy55FxSbU&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=127"],
    },
    {
        number:122,
        titleTelugu: "లాలీ లాలీ లాలీ",
        titleEnglish:"laali laali laali",
        author: "తిరుకోవళ్ళూరి స్టీవెన్",
        youtubeLinks:["https://www.youtube.com/watch?v=mHHnifKEgxU&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=129"],
    },
    {
        number:123,
        titleTelugu: "ఇస్రాయేలీయులా దేవుండే",
        titleEnglish:"Israayeleeyula devunde",
        author: "మల్లెల దావీదు",
        youtubeLinks:["https://www.youtube.com/watch?v=OdaNCBzWnkg&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=130"],
    },
    {
        number:124,
        titleTelugu: "నాడు  ప్రాణము ",
        titleEnglish:"Naadu pranamu",
        author: "భవవాసి సమూయేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=FHVzsHgmKvA&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=131"],
    },
    {
        number:125,
        titleTelugu: "నీ సమాధానము",
        titleEnglish:" nee samaadhaanamu ",
        author: "సమూయేలు పాక్యనాధము",
        youtubeLinks:["https://www.youtube.com/watch?v=VwyZc1oyfwg&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=132"],
    },
    {
        number:126,
        titleTelugu: "",
        titleEnglish:" O sadbktu laara loka",
        author: "",
        youtubeLinks:["https://www.youtube.com/watch?v=EK2PxLck6nk&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=133"],
    },
    {
        number:127,
        titleTelugu: "దూత పాట పాడుడి ",
        titleEnglish:"Duta Pata Padudi",
        author: "చార్లెస్ వెస్లీ",
        youtubeLinks:["https://www.youtube.com/watch?v=-gvMO52-koQ&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=134"],
    },
    {
        number:128,
        titleTelugu: "శుద్ధరాత్రి!",
        titleEnglish:"shuddha raatri",
        author: "జోసెఫ్ మోర్",
        youtubeLinks:["https://www.youtube.com/watch?v=VF0OB_v3qlU&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=135"],
    },
    {
        number:129,
        titleTelugu: "శ్రీ రక్షకుండు పుట్టగా ",
        titleEnglish:"shree rakshakundu puttaga",
        author: "ఎడ్మండ్ హేమిల్టన్ సియర్స్",
        youtubeLinks:["https://www.youtube.com/watch?v=7yT9OhVCUtI&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=136"],
    },
    {
        number:130,
        titleTelugu: "క్రైస్తవులారా! లెండి ",
        titleEnglish:"kraistavulaaara! lendi",
        author: "జాన్ బైరొం",
        youtubeLinks:["https://www.youtube.com/watch?v=H_V8YH5beic&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=137"],
    },
    {
        number:131,
        titleTelugu: "హాయ్, లోకమా! ప్రభువచ్చెన్",
        titleEnglish:"Hai lokama prabhu vachhen",
        author: "ఐజక్ వాట్స్",
        youtubeLinks:["https://www.youtube.com/watch?v=yYbznVun_xc&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=138"],
    },
    {
        number:132,
        titleTelugu: "రండి పాడ దూతలారా ",
        titleEnglish:"Randi paada dutalaara ",
        author: "జేమ్స్ మాంట్ గోమరీ",
        youtubeLinks:["https://www.youtube.com/watch?v=CzDiPVUgPlA&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=139"],
    },
    {
        number:133,
        titleTelugu: "ఓ బెత్లెహేము గ్రామమా!",
        titleEnglish:"O bethlehemu gramama",
        author: "ఫిలిప్ బ్రూక్స్",
        youtubeLinks:["https://www.youtube.com/watch?v=jzzBG8We1i4&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=140"],
    },
    {
        number:134,
        titleTelugu: " వేకువ చుక్కల ",
        titleEnglish:"vekuva chukkala ",
        author: "రెజినాల్డ్ హెబర్",
        youtubeLinks:["https://www.youtube.com/watch?v=DqE7zn6-cbM&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=141"],
    },
    {
        number:135,
        titleTelugu: "రండి సువార్త సునాదముతో ",
        titleEnglish:"randi suvaarta",
        author: "ఏ. బి. మాసిలామణి",
        youtubeLinks:["https://www.youtube.com/watch?v=CAEui60oGJw&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=142"],
    },
    {
        number:136,
        titleTelugu: "యేసు నామామృతము కన్నను ",
        titleEnglish:"yesu naamaamrutham",
        author: "గొల్లపల్లి నతానియేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=1GX1oWWvjbE&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=143"],
    },
    {
        number:137,
        titleTelugu: "యేసు నామ మెంతో మధురం",
        titleEnglish:"Yesu nama mento madhuram",
        author: "పురుషోత్తము చౌదరి",
        youtubeLinks:["https://www.youtube.com/watch?v=u-SWUwLQ7SU&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=144"],
    },
    {
        number:138,
        titleTelugu: "యేసు నామమే పావనము",
        titleEnglish:"Yesu namame paavanamu",
        author: "పురుషోత్తము చౌదరి",
        youtubeLinks:["https://www.youtube.com/watch?v=DZPsve-Ktgc&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=145"],
    },

    {
        number:139,
        titleTeluu: " యేసే  భగవన్నామం ",
        titleEnglish:"Yese bhagavannamam",
        author: "పి. రవివర్మ ",
        youtubeLinks:["https://www.youtube.com/watch?v=YCWPrF0tIbA&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=147"],
    },
    {
        number:140,
        titleTelugu: "యేసు నీ నామమృతము",
        titleEnglish:"yesu nee naamamruthamu",
        author: "యోసేపు దానియేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=uUcLqzO4kG8&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=148"],
    },
    {
        number:141,
        titleTelugu: "వర నామమే శరణము ",
        titleEnglish:"varanaamame saranamu ",
        author: " విలియం డాసన్",
        youtubeLinks:["https://www.youtube.com/watch?v=i7p-a6BU1lk&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=149"],
    },{
        number:142,
        titleTelugu: "శ్రీ యేసు దివ్య",
        titleEnglish:"sree yesu divya",
        author: "పంతగాని పరదేశి",
        youtubeLinks:["https://www.youtube.com/watch?v=tcGE3DE0r5A&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=150"],
    },
    {
        number:143,
        titleTelugu: "రారాజగు యేసునినామం",
        titleEnglish:" rarajagu yesuni naamam ",
        author: "పి. రవివర్మ",
        youtubeLinks:["https://www.youtube.com/watch?v=NIUq2yRoITw&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=151"],
    },
    {
        number:144,
        titleTelugu: "క్రీస్తే సర్వాధికారి",
        titleEnglish:"Kreesthe sarvadhikaari",
        author: "రావూరి రత్నము",
        youtubeLinks:["https://www.youtube.com/watch?v=uUDTR2HyMzg&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=152"],
    },

    {
        number:145,
        titleTelugu: "నీవేయని నమ్మిక",
        titleEnglish:"Neeve yani nammika",
        author: "ముంగమూరి దేవదాసు",
        youtubeLinks:["https://www.youtube.com/watch?v=GMO82EByFeI&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=153"],
    },
    {
        number:146,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:147,
        titleTelugu: "నా యేసు నామ",
        titleEnglish:"naa yesu naama",
        author: "జాన్ న్యూటన్",
        youtubeLinks:["https://www.youtube.com/watch?v=XKrdFKFUgLA&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=154"],
    },{
        number:148,
        titleTelugu: "యేసు నామము స్మరించు",
        titleEnglish:"yesu naamamu",
        author: "ఎల్. బాక్స్టర్",
        youtubeLinks:["https://www.youtube.com/watch?v=gI4nWq4snR4&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=155"],
    },{
        number:149,
        titleTelugu: "దేవుని ప్రేమ ఇదిగో",
        titleEnglish:"devuni prema idigo",
        author: "గొల్లపల్లి నతానియేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=EivdLvTJtsQ&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=156"],
    },{
        number:150,
        titleTelugu: "వినరే మనుజులారా ",
        titleEnglish:"Vinare manujulaara",
        author: "పురుషోత్తము చౌదరి",
        youtubeLinks:["https://www.youtube.com/watch?v=5p5DUCQCvQ0&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=157"],
    },{
        number:151,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },{
        number:152,
        titleTelugu: "కనరే యేసుని  ప్రత్యక్షంబు ",
        titleEnglish:"kanare yesuni pratyakshambu",
        author: "తూలూరి ప్రకాశము",
        youtubeLinks:["https://www.youtube.com/watch?v=9wgmbUL0Wb0&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=158"],
    },{
        number:153,
        titleTelugu: "నేర్చుకొనరే యేసువాడుక",
        titleEnglish:"nerchukonare yesu",
        author: "ఈతకోట ప్రకాశము ",
        youtubeLinks:["https://www.youtube.com/watch?v=TXubd4nXNkQ&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=159"],
    },{
        number:154,
        titleTelugu: "ఎవరు భాగ్యవంతు  లౌడు  ",
        titleEnglish:"yevaru bhagya vantulouduravani",
        author: "పురుషోత్తము చౌదరి",
        youtubeLinks:["https://www.youtube.com/watch?v=Q6VbrAruj4Q&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=160"],
    },{
        number:155,
        titleTelugu: "వినరయ్య నరులారా",
        titleEnglish:"vinarayya narulaara",
        author: "పురుషోత్తము చౌదరి",
        youtubeLinks:["https://www.youtube.com/watch?v=oUs_gpwv_Sw&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=161"],
    },{
        number:156,
        titleTelugu: "ఏలాటివాడో కానీ",
        titleEnglish:"yelaativaado kaanee",
        author: "తూపిలి బెంజమిన్",
        youtubeLinks:["https://www.youtube.com/watch?v=fLoY2ocppUY&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=162"],
    },{
        number:157,
        titleTelugu: "యేసు వస్త్రపు చెంగును",
        titleEnglish:"yesu vastrapu chengunu",
        author: "తూపిలి బెంజమిన్",
        youtubeLinks:["https://www.youtube.com/watch?v=p4eFYcaiR5U&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=163"],
    },{
        number:158,
        titleTelugu: "సీయోను కన్యా",
        titleEnglish:"seeyonu kanyaa",
        author: "unknown author",
        youtubeLinks:["https://www.youtube.com/watch?v=30Mix1cQ-Uc&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=164"],
    },{
        number:159,
        titleTelugu: "ద్రాక్షా వల్లిని నేను",
        titleEnglish:"draksha vallini nenu ",
        author: "ఎం. జె. రామాంజులు",
        youtubeLinks:["https://www.youtube.com/watch?v=BtgOw_gVu20&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=165"],
    },{
        number:160,
        titleTelugu: "ఇదిగో శుభద రక్షణము",
        titleEnglish:"Idugo subhada rakshanamu",
        author: "పురుషోత్తము చౌదరి",
        youtubeLinks:["https://www.youtube.com/watch?v=enPY8NdAE6g&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=166"],
    },{
        number:161,
        titleTelugu: "వింతగల మా యేసు ప్రేమను",
        titleEnglish:"vinta gala maa",
        author: "తూపిలి బెంజమిన్",
        youtubeLinks:["https://www.youtube.com/watch?v=eH6dHiSMjjw&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=167"],
    },{
        number:162,
        titleTelugu: "అన్న మన యేసు ప్రభుని",
        titleEnglish:"anna mana yesu",
        author: "రావూరి లక్ష్మయ్య",
        youtubeLinks:["https://www.youtube.com/watch?v=OXDWzwigT7E&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=168"],
    },
    {
        number:163,
        titleTelugu: "ఇడుగో గొర్రెలా కాపరి",
        titleEnglish:"Idugo gorrela kaapari",
        author: "పురుషోత్తము చౌదరి",
        youtubeLinks:["https://www.youtube.com/watch?v=CXgWulDtAw8&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=169"],
    },
    {
        number:164,
        titleTelugu: "ఈయనా యేసు రక్షకుడు",
        titleEnglish:"eeyana yesu rakshakudu",
        author: "మిక్కిలి సమూయేలు",
        youtubeLinks:["https://www.youtube.com/watch?v=W0YunQ4GeVQ&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=170"],
    },
    {
        number:165,
        titleTelugu: "ఈలాటిద యేసు ప్రేమ",
        titleEnglish:"eelaatida yesu prema",
        author: "రావూరి రంగయ్య",
        youtubeLinks:["https://www.youtube.com/watch?v=9EFxNTotnfU&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=171"],
    },
    {
        number:166,
        titleTelugu: "యేసురాజు నీదు ప్రేమ",
        titleEnglish:"yesu raja needu prema",
        author: "చదలవాడ తామస్",
        youtubeLinks:["https://www.youtube.com/watch?v=jHS0cOoSF3g&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=172"],
    },
    {
        number:167,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    }, 
    {
        number:168,
        titleTelugu: "పరమ రక్షక ",
        titleEnglish:"parama rakshaka",
        author: "రావూరి రంగయ్య",
        youtubeLinks:["https://www.youtube.com/watch?v=_1J8rzHSO3w&list=PLTKEOkSXKDj7IfNLydqwOhK_FIzC5Fzxs&index=173"],
    },
    {
        number:169,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:170,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:171,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:172,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:173,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:174,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:175,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:176,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:177,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:178,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:179,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:180,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:181,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:182,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:183,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:184,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:185,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:186,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:187,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:188,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:189,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:190,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:191,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:192,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:193,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:194,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:195,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:196,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:197,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:198,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:199,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:200,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:201,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:202,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:203,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:204,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:205,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    }, 
    {
        number:206,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:207,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:208,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:209,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:210,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:211,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:212,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:213,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    }, 
    {
        number:214,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:215,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:216,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:217,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:218,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:219,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:220,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    {
        number:221,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:222,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],  
    },
    {
        number:223,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    
    {
        number:224,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    
    {
        number:225,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    
    {
        number:226,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    
    {
        number:227,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },
    
    {
        number:228,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },

    {
        number:229,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:230,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:231,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:232,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:233,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:234,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:235,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:236,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:237,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:238,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:239,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:240,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },      
    {
        number:241,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:242,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:243,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:244,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:245,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:246,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:247,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:248,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:249,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:250,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:251,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:252,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:253,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:254,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:255,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:256,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:257,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:258,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:259,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:260,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:261,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:262,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:263,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:264,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:265,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:266,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:267,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:268,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:269,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:270,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:271,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:272,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:273,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:274,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:275,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:276,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    { 
        number:277,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:278,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],

    },  
    {
        number:279,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:280,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:281,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:282,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:283,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:284,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:285,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:286,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:287,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:288,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:289,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:290,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:291,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:292,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:293,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:294,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:295,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:296,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:297,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:298,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:299,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  
    {
        number:300,
        titleTelugu: "",
        titleEnglish:"",
        author: "",
        youtubeLinks:[""],
    },  



    // Add more songs here following the same structure...
    // Copy the example above and fill in the details for each song
    
    // Template for adding new songs:
    /*
    {
        number: [SONG_NUMBER],
        titleTelugu: "[Telugu Title]",
        titleEnglish: "[English Transliteration]",
        author: "[Author Name in Telugu]",
        lyrics: {
            telugu: `[Telugu lyrics here
            multiple lines]`,
            english: `[English translation here
            multiple lines]`
        },
        meaning: "[Meaning/explanation of the song]",
        summary: "[Brief summary]",
        youtubeLinks: [
            "https://www.youtube.com/watch?v=VIDEO_ID_1",
            "https://www.youtube.com/watch?v=VIDEO_ID_2"
        ]
    },
    */
];

// ============================================
// AUTHORS DATA
// Add author biographies and information here
// ============================================

const authorsList = [
    {
        name: "బేతాళ జాన్",
        nameEnglish: "Bethal John",
        bio: "A devoted hymn writer known for his spiritual compositions.",
        bioTelugu: "ఆత్మిక సంగీత రచయితగా ప్రసిద్ధి చెందిన రచయిత.",
        songs: [1], // Array of song numbers by this author
        featuredYouTubeLinks: [] // Optional: Featured performances
    },
    {
        name: "విలియం డాసన్",
        nameEnglish: "William Dawson",
        bio: "Renowned composer of Christian hymns in Telugu.",
        bioTelugu: "తెలుగు క్రైస్తవ కీర్తనల రచయితగా ప్రసిద్ధి చెందినవారు.",
        songs: [2],
        featuredYouTubeLinks: []
    },
    {
        name: "గొల్లపల్లి నతానియేలు",
        nameEnglish: "Gollapalli Nathaniel",
        bio: "A renowned hymn writer known for his spiritual compositions.",
        bioTelugu: "ఆత్మిక సంగీత రచయితగా ప్రసిద్ధి చెందిన రచయిత.",
        songs: [3],
        featuredYouTubeLinks: []
    },
    {   name: "పురుషోత్తము చౌదరి",
        nameEnglish: "Purushotham Choudari",
        bio: "A renowned hymn writer known for his spiritual compositions.",
        bioTelugu: "ఆత్మిక సంగీత రచయితగా ప్రసిద్ధి చెందిన రచయిత.",
        songs: [4],
        featuredYouTubeLinks: []
    },
    {
        name: "పసుపులేటి దావీదు ",
        nameEnglish: "Pushpaleti Davide",
        bio: "A renowned hymn writer known for his spiritual compositions.",
        bioTelugu: "ఆత్మిక సంగీత రచయితగా ప్రసిద్ధి చెందిన రచయిత.",
        songs: [5, 6],
        featuredYouTubeLinks: []
    },
    {
        name: "బొంతా సమూయేలు ",
        nameEnglish: "Bonta Samuel",
        bio: "A renowned hymn writer known for his spiritual compositions.",
        bioTelugu: "ఆత్మిక సంగీత రచయితగా ప్రసిద్ధి చెందిన రచయిత.",
        songs: [7],
        featuredYouTubeLinks: []
    },
    {
        name: "మిక్కిలి సమూయేలు ",
        nameEnglish: "Mikkil Samyeles",
        bio: "A renowned hymn writer known for his spiritual compositions.",
        bioTelugu: "ఆత్మిక సంగీత రచయితగా ప్రసిద్ధి చెందిన రచయిత.",
        songs: [8],
        featuredYouTubeLinks: []
    },
    {
        name: "చెట్టి భానుమూర్తి ",
        nameEnglish: "Chetti Bhanumurthi",
        bio: "A renowned hymn writer known for his spiritual compositions.",
        bioTelugu: "ఆత్మిక సంగీత రచయితగా ప్రసిద్ధి చెందిన రచయిత.",
        songs: [9],
        featuredYouTubeLinks: []
    },
    {
        name: "పులిపాక జగన్నాధము ",
        nameEnglish: "Pulipaka Jagannadhamu",
        bio: "A renowned hymn writer known for his spiritual compositions.",
        bioTelugu: "ఆత్మిక సంగీత రచయితగా ప్రసిద్ధి చెందిన రచయిత.",
        songs: [ 11, 13],
        featuredYouTubeLinks: []
    },
    {
        name: "ముంగమూరి దేవదాసు ",
        nameEnglish: "Mungamuridavas",
        bio: "A renowned hymn writer known for his spiritual compositions.",
        bioTelugu: "ఆత్మిక సంగీత రచయితగా ప్రసిద్ధి చెందిన రచయిత.",
        songs: [12, 14],
        featuredYouTubeLinks: []
    },
    
    // Add more authors here...
    // Template:
    /*
    {
        name: "[Author Name in Telugu]",
        nameEnglish: "[Author Name in English]",
        bio: "[Biography in English]",
        bioTelugu: "[Biography in Telugu]",
        songs: [1, 5, 10], // Song numbers by this author
        featuredYouTubeLinks: ["https://www.youtube.com/watch?v=VIDEO_ID"]
    },
    */
];

// Export data (for use in other JavaScript files)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { songsList, authorsList, FEATURED_YOUTUBE_CHANNEL };
}

