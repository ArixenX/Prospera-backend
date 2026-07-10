/**
 * Prospera AI Platform Core Functional Script
 * Fully Localized (EN, HI, BN) with Premium Dark Mode, Interactive Curve Charts & Node-Express API Engine
 */

let activeCharts = {};
let hasCalculatedDataBefore = false;
let currentLanguage = 'en';
let userFinancialProfile = {
    name: "", age: null, job: "",
    income: 0, expenses: 0, savings: 0, loans: 0,
    goal: "", target: 0, timeline: 0, risk: "Medium"
};

const translations = {
    en: {
        nav_home: "Home", nav_roadmap: "Build Roadmap", nav_dashboard: "Dashboard", nav_coach: "AI Coach",
        track_title: "Track 1: Digital Wealth Management System",
        hero_heading: "Plan Your Financial Future <br class='hidden sm:inline'> With AI.",
        hero_subheading: "ProsperaAI helps you analyze your income, expenses, savings, and financial goals to create a personalized financial roadmap.",
        btn_start: "Start Your Financial Journey",
        f1_title: "Smart Financial Roadmap", f1_desc: "Get custom savings plans that automatically adjust to your monthly financial situation.",
        f2_title: "Financial Health Score", f2_desc: "Check your overall financial stability score out of 100 based on your current cash habits.",
        f3_title: "Savings Planner", f3_desc: "Track your variable monthly spending trends cleanly and discover new ways to save.",
        form_main_title: "Set Up Your Plan", form_main_desc: "Provide your basic financial details below to generate your personalized planning dashboard.",
        form_sec1_title: "Personal Information", lbl_name: "Full Name", lbl_age: "Age", lbl_job: "Occupation",
        form_sec2_title: "Financial Information (INR)", lbl_income: "Monthly Income", lbl_expenses: "Monthly Expenses", lbl_savings: "Current Savings Pool", lbl_loans: "Active Debt EMIs",
        form_sec3_title: "Financial Goals", lbl_goal: "Primary Goal Target", lbl_target: "Required Target Amount (₹)", lbl_timeline: "Goal Timeline (Months)", lbl_risk: "Risk Preference Style",
        opt_placeholder: "Select your main target...", opt_bike: "Buy a Motorcycle", opt_car: "Buy a Car", opt_house: "Buy a House", opt_edu: "Higher Education", opt_fund: "Build Emergency Fund", opt_ret: "Retirement Planning", opt_travel: "International Travel",
        risk_low: "Low Risk", risk_med: "Medium Balanced", risk_high: "High Growth", btn_generate: "Generate Your Financial Plan",
        loading_title: "Building Your Personalized Plan...", loading_desc: "Analyzing your income, expenses, and savings goal parameters to optimize your investment Suggestions...",
        dash_locked_title: "Dashboard Hidden", dash_locked_desc: "Please fill out your details in the **Build Roadmap** section first to open your custom planning center.",
        btn_go_profile: "Set Up Your Profile", dash_active_title: "Your Financial Plan Dashboard", dash_active_user: "Financial plan created for", btn_edit_input: "Change Information",
        card1_title: "Financial Health Score", card2_title: "Recommended Monthly Savings", card3_title: "AI Investment Style",
        chart_title: "Savings Growth Plan", plan_title: "Your Immediate Action Items", ai_tip_lbl: "Financial Insights:", ai_tip_desc: "Follow these actionable steps to reach your goal target budget on timeline.",
        phases_title: "Your Step-by-Step Roadmap", p1_timeline: "Months 1–3", p1_title: "Build Buffer Fund", p2_timeline: "Months 4–12", p2_title: "Start Regular Investing", p3_timeline: "Year 2", p3_title: "Grow Future Wealth", p4_timeline: "Year 3+", p4_title: "Reach Goal Target",
        footer_text: "&copy; 2026 Prospera AI Framework. Engineered for IDBI Innovate Hackathon Track 1.",
        chat_welcome: "Hi! I'm your AI Financial Coach. I'll help you build a personalized financial plan and answer your financial questions. Select a common query shortcut below to test my insights:",
        chip_1: "Can I buy a bike next year?", chip_2: "How much should I save?", chip_3: "Should I invest or build an emergency fund first?",
        chat_placeholder: "Ask anything about your financial plan...",
        tip_name: "Enter your full legal name as shown on your ID cards.",
        tip_age: "Enter your current age to help the AI decide your investment timeline.",
        tip_job: "Type your current job role, profession, or if you are a student.",
        tip_income: "Enter the total monthly salary or profit you take home after taxes.",
        tip_expenses: "Enter how much you spend each month on rent, food, bills, and lifestyle.",
        tip_savings: "Enter the total cash you currently have ready in bank accounts.",
        tip_loans: "Enter the total sum of any active loans or credit card EMIs you pay monthly.",
        tip_goal: "Choose the main target you want to save money for right now.",
        tip_target: "Enter the total budget or target amount needed to complete this goal.",
        tip_timeline: "Enter how many months from now you want to achieve this goal.",
        tip_risk: "Low = Safe FD/Bonds, Medium = Balanced Mutual Funds, High = Aggressive Stocks.",
        tip_card_health: "A score out of 100 showing how stable your finances are. Higher is safer.",
        tip_card_goal: "The exact amount of money the AI suggests you save every month from your leftover cash.",
        tip_card_style: "Your chosen investment style preference.",
        tip_chart: "The blue line shows your savings growing and compounding month by month.",
        tip_plan: "A dynamic list of immediate clear check-tasks created by the AI.",
        tip_phases: "Your complete wealth plan broken down step-by-step into clear time-based phases."
    },
    hi: {
        nav_home: "होम", nav_roadmap: "वित्तीय योजना बनाएं", nav_dashboard: "डैशबोर्ड", nav_coach: "एआई कोच",
        track_title: "ट्रैक 1: डिजिटल वेल्थ Management सिस्टम",
        hero_heading: "एआई के साथ अपनी <br class='hidden sm:inline'> वित्तीय योजना बनाएं।",
        hero_subheading: "ProsperaAI आपकी आय, खर्च, बचत और वित्तीय लक्ष्यों को समझकर आपके लिए एक व्यक्तिगत योजना बनाने में मदद करता है।",
        btn_start: "अपनी वित्तीय यात्रा शुरू करें",
        f1_title: "स्मार्ट वित्तीय रोडमैप", f1_desc: "कस्टम बचत योजनाएं प्राप्त करें जो आपकी मासिक वित्तीय स्थिति के अनुसार स्वचालित रूप से बदल जाती हैं।",
        f2_title: "वित्तीय स्वास्थ्य स्कोर", f2_desc: "अपनी वर्तमान नकद आदतों के आधार पर 100 में से अपना समग्र वित्तीय स्थिरता स्कोर जांचें।",
        f3_title: "बचत योजक", f3_desc: "अपने बदलते मासिक खर्चों को आसानी से ट्रैक करें और पैसे बचाने के नए तरीके खोजें।",
        form_main_title: "अपनी योजना सेट करें", form_main_desc: "अपनी व्यक्तिगत योजना डैशबोर्ड बनाने के लिए नीचे अपनी बुनियादी वित्तीय जानकारी दें।",
        form_sec1_title: "व्यक्तिगत जानकारी", lbl_name: "पूरा नाम", lbl_age: "उम्र", lbl_job: "व्यवसाय",
        form_sec2_title: "वित्तीय जानकारी (INR)", lbl_income: "मासिक आय", lbl_expenses: "मासिक खर्च", lbl_savings: "वर्तमान बचत", lbl_loans: "चल रहे लोन की ईएमआई",
        form_sec3_title: "वित्तीय लक्ष्य", lbl_goal: "मुख्य लक्ष्य", lbl_target: "लक्ष्य राशि (₹)", lbl_timeline: "समयसीमा (महीने)", lbl_risk: "निवेश शैली पसंद",
        opt_placeholder: "अपना मुख्य लक्ष्य चुनें...", opt_bike: "मोटरसाइकिल खरीदें", opt_car: "कार खरीदें", opt_house: "घर खरीदें", opt_edu: "उच्च शिक्षा", opt_fund: "इमरजेंसी फंड बनाएं", opt_ret: "रिटायरमेंट योजना", opt_travel: "विदेश यात्रा",
        risk_low: "कम जोखिम", risk_med: "संतुलित योजना", risk_high: "उच्च वृद्धि", btn_generate: "अपनी वित्तीय योजना बनाएं",
        loading_title: "आपकी व्यक्तिगत योजना तैयार हो रही है...", loading_desc: "निवेश सुझावों को बेहतर बनाने के लिए आपकी आय, खर्च और बचत लक्ष्यों का विश्लेषण किया जा रहा है...",
        dash_locked_title: "डैशबोर्ड बंद है", dash_locked_desc: "अपनी व्यक्तिगत वित्तीय योजना देखने के लिए कृपया पहले 'वित्तीय योजना बनाएं' टैब में अपनी जानकारी भरें।",
        btn_go_profile: "अपनी प्रोफ़ाइल सेट करें", dash_active_title: "आपकी वित्तीय योजना डैशबोर्ड", dash_active_user: "वित्तीय योजना किसके लिए बनाई गई:", btn_edit_input: "जानकारी बदलें",
        card1_title: "वित्तीय स्वास्थ्य स्कोर", card2_title: "सुझाई गई मासिक बचत", card3_title: "एआई निवेश शैली",
        chart_title: "बचत वृद्धि योजना", plan_title: "आपके लिए तुरंत करने योग्य कार्य", ai_tip_lbl: "वित्तीय अंतर्दृष्टि:", ai_tip_desc: "समय पर अपने लक्ष्य के बजट तक पहुंचने के लिए इन आसान स्टेप्स का पालन करें।",
        phases_title: "आपकी कदम-दर-कदम योजना", p1_timeline: "महीने 1–3", p1_title: "इमरजेंसी फंड बनाएं", p2_timeline: "महीने 4–12", p2_title: "नियमित निवेश शुरू करें", p3_timeline: "वर्ष 2", p3_title: "भविष्य की संपत्ति बढ़ाएं", p4_timeline: "वर्ष 3+", p4_title: "अपना मुख्य लक्ष्य पाएं",
        footer_text: "&copy; 2026 प्रोस्पेरा एआई प्लेटफॉर्म। आईडीबीआई इनोवेट हैकाथॉन के लिए बनाया गया।",
        chat_welcome: "नमस्ते! मैं आपका एआई वित्तीय कोच हूं। मैं एक व्यक्तिगत वित्तीय योजना बनाने और आपके वित्तीय सवालों के जवाब देने में मदद करूंगा। नीचे दिए गए शॉर्टकट्स का उपयोग करें:",
        chip_1: "क्या मैं अगले साल बाइक खरीद सकता हूँ?", chip_2: "मुझे कितनी बचत करनी चाहिए?", chip_3: "मुझे पहले निवेश करना चाहिए या आपातकालीन फंड बनाना चाहिए?",
        chat_placeholder: "अपनी वित्तीय योजना के बारे में कुछ भी पूछें...",
        tip_name: "अपना पूरा नाम दर्ज करें जैसा कि आपके आईडी कार्ड पर है।",
        tip_age: "एआई को आपकी निवेश समयरेखा तय करने में मदद करने के लिए अपनी उम्र दर्ज करें।",
        tip_job: "अपनी वर्तमान नौकरी, पेशा लिखें, या यदि आप एक छात्र हैं।",
        tip_income: "टैक्स के बाद मिलने वाली कुल मासिक सैलरी या व्यावसायिक लाभ दर्ज करें।",
        tip_expenses: "दर्ज करें कि आप हर महीने किराए, भोजन, बिल और जीवन शैली पर कितना खर्च करते हैं।",
        tip_savings: "बैंक खातों में वर्तमान में उपलब्ध कुल नकद राशि दर्ज करें।",
        tip_loans: "आपके द्वारा मासिक भुगतान किए जाने वाले किसी भी लोन या क्रेडिट कार्ड ईएमआई की कुल राशि दर्ज करें।",
        tip_goal: "वह मुख्य लक्ष्य चुनें जिसके लिए आप अभी पैसे बचाना चाहते हैं।",
        tip_target: "इस लक्ष्य को पूरा करने के लिए आवश्यक कुल बजट दर्ज करें।",
        tip_timeline: "दर्ज करें कि आप कितने महीनों में इस लक्ष्य को प्राप्त करना चाहते हैं।",
        tip_risk: "कम = सुरक्षित एफडी/बॉन्ड, मध्यम = संतुलित म्यूचुअल फंड, उच्च = आक्रामक स्टॉक।",
        tip_card_health: "100 में से एक स्कोर जो दिखाता है कि आपकी वित्तीय स्थिति कितनी स्थिर है। उच्चतर बेहतर है।",
        tip_card_goal: "सटीक राशि जो एआई आपको आपके बचे हुए पैसे से हर महीने बचाने का सुझाव देता है।",
        tip_card_style: "आपकी चुनी हुई निवेश पसंद शैली।",
        tip_chart: "नीली रेखा आपकी बचत को महीने-दर-महीने बढ़ते हुए दिखाती है।",
        tip_plan: "एआई द्वारा आपके ट्रैक पर रहने के लिए बनाए गए तत्काल स्पष्ट कार्यों की एक सूची।",
        tip_phases: "आपकी पूरी वित्तीय योजना स्पष्ट समय-आधारित चरणों में विभाजित है।"
    },
    bn: {
        nav_home: "হোম", nav_roadmap: "পরিকল্পনা তৈরি করুন", nav_dashboard: "ড্যাশবোর্ড", nav_coach: "এআই কোচ",
        track_title: "ট্র্যাক 1: ডিজিটাল ওয়েলথ ম্যানেজমেন্ট সিস্টেম",
        hero_heading: "এআই দিয়ে আপনার <br class='hidden sm:inline'> আর্থিক ভবিষ্যৎ যাান।",
        hero_subheading: "ProsperaAI আপনার আয়, খরচ, সঞ্চয় এবং আর্থিক লক্ষ্যগুলি বিশ্লেষণ করে একটি ব্যক্তিগত আর্থিক পরিকল্পনা তৈরি করতে সাহায্য করে।",
        btn_start: "আপনার আর্থিক যাত্রা শুরু করুন",
        f1_title: "স্মার্ট আর্থিক রোডম্যাপ", f1_desc: "কাস্টম সঞ্চয় পরিকল্পনা পান যা আপনার মাসিক আর্থিক পরিস্থিতির সাথে স্বয়ংক্রিয়ভাবে সামঞ্জস্য করে।",
        f2_title: "আর্থিক স্বাস্থ্য স্কোর", f2_desc: "আপনার বর্তমান নগদ অভ্যাসের উপর ভিত্তি করে 100 এর মধ্যে আপনার সামগ্রিক আর্থিক স্থায়িত্ব স্কোর পরীক্ষা করুন।",
        f3_title: "সঞ্চয় পরিকল্পনাকারী", f3_desc: "আপনার পরিবর্তনশীল মাসিক খরচের প্রবণতা সহজে ট্র্যাক করুন এবং টাকা বাঁচানোর নতুন উপায় খুঁজুন।",
        form_main_title: "আপনার পরিকল্পনা সেট করুন", form_main_desc: "আপনার ব্যক্তিগতকৃত আর্থিক ড্যাশবোর্ড তৈরি করতে নিচে আপনার প্রাথমিক আর্থিক বিবরণ দিন।",
        form_sec1_title: "ব্যক্তিগত তথ্য", lbl_name: "সম্পূর্ণ নাম", lbl_age: "বয়স", lbl_job: "পেশা",
        form_sec2_title: "আর্থিক তথ্য (INR)", lbl_income: "মাসিক আয়", lbl_expenses: "মাসিক খরচ", lbl_savings: "বর্তমান সঞ্চয়", lbl_loans: "চলতি ঋণের ইএমআই",
        form_sec3_title: "আর্থিক লক্ষ্যসমূহ", lbl_goal: "প্রধান লক্ষ্য", lbl_target: "প্রয়োজনীয় লক্ষ্যের পরিমাণ (₹)", lbl_timeline: "সময়সীমা (মাস)", lbl_risk: "বিনিয়োগের পছন্দ শৈলী",
        opt_placeholder: "আপনার প্রধান লক্ষ্য চয়ন করুন...", opt_bike: "মোটরসাইকেল কেনা", opt_car: "গাড়ি কেনা", opt_house: "বাড়ি কেনা", opt_edu: "উচ্চ শিক্ষা", opt_fund: "জরুরি তহবিল গঠন", opt_ret: "অবসরকালীন পরিকল্পনা", opt_travel: "বিদেশ ভ্রমণ",
        risk_low: "কম ঝুঁকি", risk_med: "ভারসাম্যপূর্ণ পরিকল্পনা", risk_high: "উচ্চ প্রবৃদ্ধি", btn_generate: "আপনার আর্থিক পরিকল্পনা তৈরি করুন",
        loading_title: "আপনার ব্যক্তিগত পরিকল্পনা তৈরি হচ্ছে...", loading_desc: "বিনিয়োগের পরামর্শগুলি আরও উন্নত করতে আপনার আয়, ব্যয় এবং সঞ্চয়ের লক্ষ্যগুলি বিশ্লেষণ করা হচ্ছে...",
        dash_locked_title: "ড্যাশবোর্ড লক করা আছে", dash_locked_desc: "আপনার ব্যক্তিগত আর্থিক পরিকল্পনা দেখতে অনুগ্রহ করে প্রথমে 'পরিকল্পনা তৈরি করুন' ট্যাবে আপনার আর্থিক বিবরণ পূরণ করুন।",
        btn_go_profile: "আপনার প্রোফাইল সেট আপ করুন", dash_active_title: "আপনার আর্থিক পরিকল্পনা ড্যাশবোর্ড", dash_active_user: "আর্থিক পরিকল্পনা যার জন্য তৈরি:", btn_edit_input: "তথ্য পরিবর্তন করুন",
        card1_title: "আর্থিক স্বাস্থ্য স্কোর", card2_title: "প্রস্তাবিত মাসিক সঞ্চয়", card3_title: "এআই বিনিয়োগ শৈলী",
        chart_title: "সঞ্চয় বৃদ্ধি পরিকল্পনা", plan_title: "আপনার জন্য জরুরি করণীয় কাজ", ai_tip_lbl: "আর্থিক অন্তর্দৃষ্টি:", ai_tip_desc: "সময়মতো আপনার লক্ষ্যের বাজেটে পৌঁছানোর জন্য এই সহজ পদক্ষেপগুলি অনুসরণ করুন।",
        phases_title: "আপনার ধাপে ধাপে রোডম্যাপ", p1_timeline: "মাস 1–3", p1_title: "জরুরি তহবিল গঠন", p2_timeline: "মাস 4–12", p2_title: "নিয়মিত বিনিয়োগ শুরু", p3_timeline: "বছর 2", p3_title: "ভবিষ্যতের সম্পদ বৃদ্ধি", p4_timeline: "বছর 3+", p4_title: "প্রধান লক্ষ্য অর্জন",
        footer_text: "&copy; 2026 প্রস্পেরা এআই প্ল্যাটফর্ম। আইডিবিআই ইনোভেট হ্যাকাথনের জন্য তৈরি করা হয়েছে।",
        chat_welcome: "নমস্কার! আমি আপনার এআই ফাইন্যান্সিয়াল কোচ। আমি একটি ব্যক্তিগত আর্থিক পরিকল্পনা তৈরি করতে এবং আপনার আর্থিক প্রশ্নের উত্তর দিতে সাহায্য করব। নিচের শর্টকাটগুলি ব্যবহার করুন:",
        chip_1: "আমি কি পরের বছর একটি বাইক কিনতে পারি?", chip_2: "আমার কত সঞ্চয় করা উচিত?", chip_3: "আমার কি প্রথমে বিনিয়োগ করা উচিত নাকি জরুরি তহবিল তৈরি করা উচিত?",
        chat_placeholder: "আপনার আর্থিক পরিকল্পনা সম্পর্কে যেকোনো কিছু জিজ্ঞাসা করুন...",
        tip_name: "আপনার আইডি কার্ডে দেখানো আপনার সম্পূর্ণ নাম লিখুন।",
        tip_age: "এআই-কে আপনার বিনিয়োগের সময়রেখা নির্ধারণ করতে সাহায্য করতে আপনার বয়স লিখুন।",
        tip_job: "আপনার বর্তমান কাজের ভূমিকা বা পেশা লিখুন, অথবা আপনি যদি একজন ছাত্র হন।",
        tip_income: "কর কাটার পর আপনি যে মোট মাসিক বেতন বা ব্যবসায়িক লাভ পান তা লিখুন।",
        tip_expenses: "ভাড়া, খাবার, বিল এবং জীবনযাত্রার জন্য প্রতি মাসে আপনি কত খরচ করেন তা লিখুন।",
        tip_savings: "ব্যাংক অ্যাকাউন্টে বর্তমানে উপলব্ধ মোট নগদ পরিমাণ লিখুন।",
        tip_loans: "আপনার মাসিক প্রদত্ত কোনো ঋণ বা ক্রেডিট কার্ড ইএমআই-এর মোট পরিমাণ লিখুন।",
        tip_goal: "আপনি এখনই যে প্রধান লক্ষ্যের জন্য অর্থ সঞ্চয় করতে চান তা চয়ন করুন।",
        tip_target: "এই লক্ষ্যটি সম্পূর্ণ করার জন্য প্রয়োজনীয় মোট বাজেট লিখুন।",
        tip_timeline: "আজ থেকে কত মাসের মধ্যে আপনি এই লক্ষ্যটি অর্জন করতে চান তা লিখুন।",
        tip_risk: "কম = নিরাপদ এফডি/বন্ড, মাঝারি = ভারসাম্যপূর্ণ মিউচুয়াল ফান্ড, উচ্চ = আক্রমণাত্মক স্টক।",
        tip_card_health: "100 এর মধ্যে একটি স্কোর যা দেখায় আপনার আর্থিক পরিস্থিতি কতটা স্থিতিশীল। উচ্চতর নিরাপদ।",
        tip_card_goal: "নির্দিষ্ট পরিমাণ টাকা যা এআই আপনাকে আপনার অবশিষ্ট টাকা থেকে প্রতি মাসে সঞ্চয় করার পরামর্শ দেয়।",
        tip_card_style: "আপনার নির্বাচিত বিনিয়োগের মেজাজ শৈলী।",
        tip_chart: "নীল রেখাটি প্রতি মাসে আপনার সঞ্চয় বৃদ্ধি পাওয়া দেখায়।",
        tip_plan: "আপনার ট্র্যাকে থাকার জন্য এআই দ্বারা তৈরি তাত্ক্ষণিক স্পষ্ট কাজের একটি তালিকা।",
        tip_phases: "আপনার সম্পূর্ণ সম্পদ পরিকল্পনা স্পষ্ট সময়-ভিত্তিক পর্যায়ে ধাপে ধাপে বিভক্ত।"
    }
};

function changeLanguage(lang) {
    currentLanguage = lang;
    const dictionary = translations[lang];

    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (dictionary[key]) {
            element.innerHTML = dictionary[key];
        }
    });

    document.getElementById('chat-input').placeholder = dictionary.chat_placeholder;

    Object.keys(dictionary).forEach(key => {
        if (key.startsWith('tip_')) {
            const elementId = key.replace('tip_', 'tip-');
            const targetTrigger = document.getElementById(elementId);
            if (targetTrigger) {
                targetTrigger.setAttribute('data-tip', dictionary[key]);
            }
        }
    });

    const welcomeBubble = document.getElementById('chat-welcome-bubble');
    if (welcomeBubble) {
        welcomeBubble.innerHTML = `<p>${dictionary.chat_welcome}</p>`;
    }
    document.getElementById('chip-q1').innerText = `"${dictionary.chip_1}"`;
    document.getElementById('chip-q2').innerText = `"${dictionary.chip_2}"`;
    document.getElementById('chip-q3').innerText = `"${dictionary.chip_3}"`;

    if (hasCalculatedDataBefore) {
        computeFinancialAnalytics();
    }
}

function toggleThemeMode() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        themeIcon.setAttribute('data-lucide', 'moon');
    } else {
        body.classList.add('dark-mode');
        themeIcon.setAttribute('data-lucide', 'sun');
    }
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('nav-active');
    });

    const targetPage = document.getElementById(pageId);
    if(targetPage) {
        targetPage.classList.add('active');
        targetPage.style.display = 'block';
        
        if (pageId === 'dashboard') {
            handleDashboardViewInitialization();
        } else {
            targetPage.classList.remove('animate-fade-in-up');
            void targetPage.offsetWidth; 
            targetPage.classList.add('animate-fade-in-up');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const activeDesktopBtn = document.getElementById(`nav-desktop-${pageId}`);
    if (activeDesktopBtn) activeDesktopBtn.classList.add('nav-active');

    if (pageId === 'coach') {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        
        setTimeout(() => {
            const chatBox = document.getElementById('chat-box');
            if(chatBox) chatBox.scrollTop = chatBox.scrollHeight;
        }, 50);
    } else {
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
    }

    const hamburgerBtn = document.getElementById('hamburger-btn');
    if (hamburgerBtn && hamburgerBtn.classList.contains('open')) {
        toggleMobileMenu();
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function mobileNavRedirect(pageId) {
    navigateTo(pageId);
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const overlayElement = document.getElementById('body-overlay');

    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        hamburgerBtn.classList.add('open');
        overlayElement.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        hamburgerBtn.classList.remove('open');
        overlayElement.classList.add('hidden');
    }
}

function handleDashboardViewInitialization() {
    const emptyStateLayer = document.getElementById('dashboard-empty-state');
    const activeContentLayer = document.getElementById('dashboard-active-content');

    if (!hasCalculatedDataBefore) {
        if (emptyStateLayer) emptyStateLayer.classList.remove('hidden');
        if (activeContentLayer) activeContentLayer.classList.add('hidden');
    } else {
        if (emptyStateLayer) emptyStateLayer.classList.add('hidden');
        if (activeContentLayer) activeContentLayer.classList.remove('hidden');
        
        const p = userFinancialProfile;
        const optimalSavings = Math.floor(Math.max(0, p.income - p.expenses - p.loans) * 0.80);
        renderCharts(p.income, p.expenses, optimalSavings, p.target, p.timeline);
    }
}

function generateRoadmap(event) {
    event.preventDefault();

    userFinancialProfile.name = document.getElementById('prof-name').value;
    userFinancialProfile.age = parseInt(document.getElementById('prof-age').value);
    userFinancialProfile.job = document.getElementById('prof-job').value;
    userFinancialProfile.income = parseFloat(document.getElementById('prof-income').value);
    userFinancialProfile.expenses = parseFloat(document.getElementById('prof-expenses').value);
    userFinancialProfile.savings = parseFloat(document.getElementById('prof-savings').value);
    userFinancialProfile.loans = parseFloat(document.getElementById('prof-loans').value) || 0;
    userFinancialProfile.goal = document.getElementById('prof-goal').value;
    userFinancialProfile.target = parseFloat(document.getElementById('prof-target').value);
    userFinancialProfile.timeline = parseInt(document.getElementById('prof-timeline').value);
    userFinancialProfile.risk = document.querySelector('input[name="risk"]:checked').value;

    hasCalculatedDataBefore = true;

    document.getElementById('profile').classList.remove('active');
    document.getElementById('profile').style.display = 'none';
    
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.remove('hidden');
    loadingScreen.classList.add('flex');

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        loadingScreen.classList.remove('flex');
        computeFinancialAnalytics();
        navigateTo('dashboard');
    }, 1800);
}

function computeFinancialAnalytics() {
    const p = userFinancialProfile;
    const surplus = p.income - p.expenses - p.loans;
    const savingsRatio = p.income > 0 ? (surplus / p.income) : 0;
    
    let score = 60 + Math.floor(savingsRatio * 40);
    if(p.loans === 0) score += 5;
    if(p.savings > p.expenses * 2) score += 5;
    score = Math.min(Math.max(score, 45), 98);

    document.getElementById('dash-user-name').innerText = p.name;
    document.getElementById('card-score').innerText = score;
    document.getElementById('card-score-progress').style.width = `${score}%`;
    
    const optimalSavings = Math.floor(Math.max(0, surplus) * 0.80);
    document.getElementById('card-reco').innerText = `\u20B9${optimalSavings.toLocaleString('en-IN')}`;
    document.getElementById('card-risk').innerText = p.risk;

    const riskBadge = document.getElementById('card-risk-badge');
    if (currentLanguage === 'hi') {
        document.getElementById('card-potential').innerText = `₹${Math.max(0, surplus).toLocaleString('en-IN')} बचे हुए पैसों में से`;
        riskBadge.innerText = p.risk === 'High' ? 'उच्च वृद्धि शैली' : p.risk === 'Medium' ? 'संतुलित योजना' : 'सुरक्षित बचत शैली';
        
        document.getElementById('timeline-p1').innerText = `एक मजबूत बैकअप फंड बनाने के लिए सुरक्षित बचत खाते में ₹${optimalSavings.toLocaleString('en-IN')}/महीना बचाएं।`;
        document.getElementById('timeline-p2').innerText = `अपने ${p.risk} जोखिम पसंद के अनुसार मासिक बचत को म्यूचुअल फंड में डालना शुरू करें।`;
        document.getElementById('timeline-p3').innerText = `अपनी बचत की गति बढ़ाने के लिए ब्याज को दोबारा निवेश करें और फालतू खर्चों से बचें।`;
        document.getElementById('timeline-p4').innerText = `आपकी कुल बचत आपके मुख्य लक्ष्य ${p.goal} के ₹${p.target.toLocaleString('en-IN')} के बजट को सफलतापूर्वक प्राप्त कर लेगी।`;
    } else if (currentLanguage === 'bn') {
        document.getElementById('card-potential').innerText = `\u20B9${Math.max(0, surplus).toLocaleString('en-IN')} মোট অবশিষ্ট টাকা থেকে`;
        riskBadge.innerText = p.risk === 'High' ? 'উচ্চ প্রবৃদ্ধি শৈলী' : p.risk === 'Medium' ? 'ভারসাম্যপূর্ণ শৈলী' : 'নিরাপদ সঞ্চয় শৈলী';

        document.getElementById('timeline-p1').innerText = `একটি গোপন তহবিল তৈরি করতে নিরাপদ সেভিংস অ্যাকাউন্টে ₹${optimalSavings.toLocaleString('en-IN')}/মাস বাঁচান।`;
        document.getElementById('timeline-p2').innerText = `আপনাদের ${p.risk} ঝুঁকির পছন্দ অনুযায়ী মাসিক সঞ্চয় মিউচুয়াল ফান্ডে দেওয়া শুরু করুন।`;
        document.getElementById('timeline-p3').innerText = `গতি বােলার জন্য রিটার্ন পুনরায় বিনিয়োগ করুন এবং অতিরিক্ত খরচ এড়িয়ে চলুন।`;
        document.getElementById('timeline-p4').innerText = `আপনার মোট সঞ্চিত তহবিল আপনার প্রধান লক্ষ্য ${p.goal} এর জন্য ₹${p.target.toLocaleString('en-IN')} এর বাজেট সফলভাবে স্পর্শ করবে।`;
    } else {
        document.getElementById('card-potential').innerText = `Out of \u20B9${Math.max(0, surplus).toLocaleString('en-IN')} total monthly leftover cash`;
        riskBadge.innerText = p.risk === 'High' ? 'Aggressive Growth Plan' : p.risk === 'Medium' ? 'Balanced Plan' : 'Capital Preservation Plan';

        document.getElementById('timeline-p1').innerText = `Save \u20B9${optimalSavings.toLocaleString('en-IN')}/month into secure liquid funds to build your initial emergency fund cushion.`;
        document.getElementById('timeline-p2').innerText = `Direct your monthly savings into diversified portfolios matching your balanced ${p.risk} style preference.`;
        document.getElementById('timeline-p3').innerText = `Reinvest returns automatically and avoid variable budget leaks to increase compounding growth speed.`;
        document.getElementById('timeline-p4').innerText = `Your total accumulated pool fully completes your \u20B9${p.target.toLocaleString('en-IN')} budget for your ${p.goal}.`;
    }

    if(p.risk === 'High') {
        riskBadge.className = "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-100 inline-block";
    } else if(p.risk === 'Low') {
        riskBadge.className = "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 inline-block";
    } else {
        riskBadge.className = "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-100 inline-block";
    }

    const checklistContainer = document.getElementById('priority-checklist');
    checklistContainer.innerHTML = `
        <div class="flex items-start space-x-2 text-xs"><input type="checkbox" checked class="rounded text-blue-500 mt-0.5"> <span class="text-gray-600 font-medium">${currentLanguage === 'hi' ? 'इमरजेंसी फंड अलग रखें:' : currentLanguage === 'bn' ? 'জরুরি তহবিল আলাদা রাখুন:' : 'Emergency Buffer Fund:'} ₹${(p.expenses * 3).toLocaleString('en-IN')}</span></div>
        <div class="flex items-start space-x-2 text-xs"><input type="checkbox" class="rounded text-blue-500 mt-0.5"> <span class="text-gray-600 font-medium">${currentLanguage === 'hi' ? 'मासिक ऑटो-ट्रांसफर सेट करें:' : currentLanguage === 'bn' ? 'মাসিক অটো-ট্রান্সফার সেট করুন:' : 'Set Up Automated Monthly Savings Transfer:'} ₹${optimalSavings.toLocaleString('en-IN')}</span></div>
    `;

    renderCharts(p.income, p.expenses, optimalSavings, p.target, p.timeline);
}

function renderCharts(income, expenses, savingsContribution, targetAmount, timelineMonths) {
    const projCanvas = document.getElementById('projectionChart');
    if (!projCanvas) return;

    if (activeCharts.projection) activeCharts.projection.destroy();

    const ctxProj = projCanvas.getContext('2d');
    
    const dynamicGradientFill = ctxProj.createLinearGradient(0, 0, 0, 240);
    dynamicGradientFill.addColorStop(0, 'rgba(10, 132, 255, 0.22)');
    dynamicGradientFill.addColorStop(1, 'rgba(10, 132, 255, 0.00)');

    const trackingLabels = [];
    const trajectoryData = [];
    const baselineTargetData = [];
    
    let poolValue = Number(userFinancialProfile.savings) || 0;
    const compoundingRate = userFinancialProfile.risk === 'High' ? 1.012 : userFinancialProfile.risk === 'Medium' ? 1.007 : 1.003;
    const trackingSteps = 6;
    const intervalMonths = Math.max(1, Math.floor(timelineMonths / (trackingSteps - 1)));

    for (let currentStep = 0; currentStep < trackingSteps; currentStep++) {
        let currentMonth = currentStep * intervalMonths;
        if (currentStep === trackingSteps - 1) currentMonth = timelineMonths; 
        
        trackingLabels.push(`${currentLanguage === 'hi' ? 'महीना' : currentLanguage === 'bn' ? 'মাস' : 'Month'} ${currentMonth}`);
        trajectoryData.push(Math.floor(poolValue));
        baselineTargetData.push(targetAmount);

        for (let stepMonth = 0; stepMonth < intervalMonths; stepMonth++) {
            poolValue = (poolValue + savingsContribution) * compoundingRate;
        }
    }

    activeCharts.projection = new Chart(ctxProj, {
        type: 'line',
        data: {
            labels: trackingLabels,
            datasets: [
                { 
                    label: currentLanguage === 'hi' ? 'अनुमानित धन वृद्धि' : currentLanguage === 'bn' ? 'অনুমিত সম্পদ বৃদ্ধি' : 'Projected Wealth Growth', 
                    data: trajectoryData, 
                    borderColor: '#0A84FF', 
                    backgroundColor: dynamicGradientFill, 
                    fill: true, 
                    tension: 0.35, 
                    borderWidth: 3, 
                    pointRadius: 4,
                    pointBackgroundColor: '#0A84FF',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 1.5,
                    pointHoverRadius: 6
                },
                { 
                    label: currentLanguage === 'hi' ? 'लक्ष्य बजट सीमा रेखा' : currentLanguage === 'bn' ? 'লক্ষ্য বাজেট রেখা' : 'Target Goal Budget', 
                    data: baselineTargetData, 
                    borderColor: '#ef4444', 
                    borderDash: [5, 5], 
                    pointRadius: 0, 
                    borderWidth: 1.5 
                }
            ]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false, 
            plugins: { 
                legend: { 
                    display: true, 
                    position: 'top', 
                    labels: { boxWidth: 10, font: { size: 10, weight: '700' } } 
                } 
            },
            scales: { 
                y: { 
                    grid: { color: 'rgba(148, 163, 184, 0.05)' },
                    ticks: {
                        font: { size: 9, weight: '600' },
                        callback: function(v) { return '₹' + v.toLocaleString('en-IN'); }
                    }
                }, 
                x: { 
                    grid: { display: false },
                    ticks: { font: { size: 9, weight: '600' } }
                } 
            }
        }
    });
}

function initializeTooltipFramework() {
    const tooltipBox = document.getElementById('global-tooltip');
    if (!tooltipBox) return;
    
    document.querySelectorAll('.tooltip-trigger').forEach(trigger => {
        const handleShow = () => {
            const dataText = trigger.getAttribute('data-tip');
            tooltipBox.innerText = dataText;
            tooltipBox.classList.add('visible');
            
            const coordinates = trigger.getBoundingClientRect();
            tooltipBox.style.top = `${coordinates.top + window.scrollY - tooltipBox.offsetHeight - 10}px`;
            tooltipBox.style.left = `${coordinates.left + window.scrollX - (tooltipBox.offsetWidth / 2) + 9}px`;
        };

        const handleHide = () => {
            tooltipBox.classList.remove('visible');
        };

        trigger.addEventListener('mouseenter', handleShow);
        trigger.addEventListener('mouseleave', handleHide);
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            handleShow();
        });
    });

    document.addEventListener('click', () => {
        if (tooltipBox) tooltipBox.classList.remove('visible');
    });
}

// Fixed Chat Bubble dynamic generation for Dark-Mode
function appendChatMessage(role, text) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;

    const messageWrapper = document.createElement('div');
    messageWrapper.className = `flex items-start space-x-3 max-w-[85%] mb-4 ${role === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''}`;
    
    const tag = role === 'user' ? 'ME' : 'AI';
    const bubbleStyle = role === 'user' 
        ? "bg-gray-100 border border-gray-200 text-gray-900 dark-mode-user-msg" 
        : "bg-white border border-gray-100 text-gray-800 dark-mode-ai-msg";

    messageWrapper.innerHTML = `
        <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${role === 'user' ? 'bg-blue-100 text-[#0A84FF]' : 'bg-slate-200 text-slate-700'}">${tag}</div>
        <div class="p-4 rounded-2xl text-sm leading-relaxed ${bubbleStyle} chat-message-bubble">
            <p>${text}</p>
        </div>
    `;
    
    chatBox.appendChild(messageWrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function appendChatLoadingIndicator(id) {
    const chatBox = document.getElementById('chat-box');
    if (!chatBox) return;
    
    const loader = document.createElement('div');
    loader.id = id;
    loader.className = "flex items-center space-x-2 text-gray-400 text-xs pl-11 mb-4";
    loader.innerHTML = `
        <div class="flex space-x-1 animate-pulse"><div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div><div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div><div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div></div>
        <span class="font-mono text-[9px] font-bold tracking-wider uppercase">Thinking...</span>
    `;
    chatBox.appendChild(loader);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeChatLoadingIndicator(id) {
    const target = document.getElementById(id);
    if (target) target.remove();
}

async function submitChat(event) {
    event.preventDefault();
    const inputField = document.getElementById('chat-input');
    const text = inputField.value.trim();
    if (!text) return;

    appendChatMessage('user', text);
    inputField.value = '';

    const id = 'loader-' + Date.now();
    appendChatLoadingIndicator(id);

    try {
        const response = await fetch('https://prospera-backend-4isr.onrender.com/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: text,
                financialData: userFinancialProfile 
            })
        });

        const data = await response.json();
        removeChatLoadingIndicator(id);
        
        if (data.reply) {
            appendChatMessage('ai', data.reply);
        } else {
            appendChatMessage('ai', "I encountered an integration issue. Please verify backend configurations.");
        }
    } catch (error) {
        console.error(error);
        removeChatLoadingIndicator(id);
        appendChatMessage('ai', "Unable to connect to the live AI engine. Please ensure your local server is running.");
    }
}

async function submitSuggestedQuestion(questionText) {
    appendChatMessage('user', questionText);
    const id = 'loader-' + Date.now();
    appendChatLoadingIndicator(id);

    try {
        const response = await fetch('https://prospera-backend-4isr.onrender.com/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: questionText,
                financialData: userFinancialProfile
            })
        });

        const data = await response.json();
        removeChatLoadingIndicator(id);
        
        if (data.reply) {
            appendChatMessage('ai', data.reply);
        }
    } catch (error) {
        removeChatLoadingIndicator(id);
        appendChatMessage('ai', "Connection to the financial AI server lost.");
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    initializeTooltipFramework();
    navigateTo('landing');
});