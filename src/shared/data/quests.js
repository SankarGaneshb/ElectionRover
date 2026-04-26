export const QUESTS = {
  voter: [
    {
      id: "voter-reg",
      title: "The Registration Trail",
      description: "Ensure you are on the electoral roll and ready to vote.",
      steps: [
        { title: "Eligibility Check", content: "Are you 18? Are you a citizen?" },
        { title: "Form 6 Submission", content: "Learn how to apply for new registration." },
        { title: "EPIC Verification", content: "Check your Voter ID status online." }
      ],
      points: 50,
      badge: "Informed Voter"
    },
    {
      id: "voter-booth",
      title: "Booth Locator",
      description: "Find where your voice will be heard.",
      steps: [
        { title: "District Mapping", content: "Find your DEO and constituency." },
        { title: "Station Selection", content: "Locate your specific polling station." }
      ],
      points: 30,
      badge: "Ready Citizen"
    },
    {
      id: "voter-misinfo",
      title: "The Verification Shield",
      description: "Learn how AI-powered systems detect and flag election misinformation in real time.",
      steps: [
        { title: "Spot the Fake", content: "You will be shown real-world examples of misinformation spread during elections — fake candidate statements, doctored images, and misleading poll dates. Your task: identify which claims are false and explain why." },
        { title: "Report & Flag", content: "Learn how citizens and political party agents can submit suspicious content for verification. Understand the reporting pipeline — from a single flagged post to a clustered misinformation pattern detected by AI System." },
        { title: "See the Cluster", content: "Watch how Advanced AI groups hundreds of individual reports into coordinated misinformation campaigns. The simulation shows how a single fake claim about a candidate spreads across platforms and how AI identifies the source patterns." },
        { title: "Verify with AI", content: "Gemini evaluates the flagged content against verified election commission data. See the confidence scores, source attribution, and final verdict — all powered by Advanced AI.GENERATE_TEXT running inside SQL queries." }
      ],
      points: 75,
      badge: "Truth Guardian"
    }
  ],
  candidate: [
    {
      id: "cand-nomination",
      title: "The Nomination Quest",
      description: "The technical journey to becoming a legal contestant.",
      steps: [
        { title: "Security Deposit", content: "Understanding the financial commitment." },
        { title: "Affidavit (Form 26)", content: "Declare your assets and background." },
        { title: "Scrutiny Phase", content: "What happens during RO verification." }
      ],
      points: 100,
      badge: "Legitimate Contestant"
    },
    {
      id: "cand-misinfo",
      title: "Defend Your Narrative",
      description: "Understand how false claims about candidates get reported, clustered, and verified through AI.",
      steps: [
        { title: "Anatomy of a Smear", content: "Examine real examples of coordinated false narratives against candidates — fake criminal records, doctored speeches, and fabricated endorsements. Understand how they originate and spread." },
        { title: "The Reporting Pipeline", content: "Learn how citizens, party workers, and election officials submit suspicious claims. Each report enters a AI System dataset where it is timestamped, geo-tagged, and source-mapped." },
        { title: "AI-Powered Cluster Detection", content: "Advanced AI groups individual reports by content similarity, timing patterns, and geographic spread. See how 50 separate reports about a fake candidate statement get linked to a single coordinated campaign." },
        { title: "Official Verification & Response", content: "The Election Commission reviews AI-generated verdicts. Candidates learn how to formally request fact-checks and how verified rebuttals are published through official channels." }
      ],
      points: 120,
      badge: "Integrity Champion"
    }
  ],
  sre: [
    {
      id: "sre_self_heal",
      title: "Self-Healing Protocols",
      description: "Monitor and execute autonomous infrastructure self-healing.",
      steps: [
        { title: "SRE Health Check", content: "Review container health and active anomalies." },
        { title: "Apply Auto-Heal", content: "Authorize AI agent to scale up database connections." }
      ],
      points: 80,
      badge: "SRE Guardian"
    }
  ]
};
