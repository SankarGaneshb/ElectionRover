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
    }
  ]
};
