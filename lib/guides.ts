export interface FinancialGuide {
  slug: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  introduction: string;
  sections: {
    heading: string;
    paragraphs: string[];
    points?: string[];
  }[];
}

export const financialGuides: FinancialGuide[] = [
  {
    slug: "how-to-choose-a-financial-advisor",
    category: "Getting started",
    title: "How to choose a financial advisor",
    summary:
      "A practical way to define what you need, compare your options, and decide who feels like the right fit.",
    readTime: "7 min read",
    introduction:
      "Choosing an advisor is easier when you know what you want help with. Start by writing down the decisions on your mind, then use the same questions to compare each person you speak with.",
    sections: [
      {
        heading: "Start with your priorities",
        paragraphs: [
          "You may be looking for a one-time financial plan, ongoing investment management, retirement income guidance, help with taxes, or support coordinating several parts of your financial life. Your needs can change over time, so focus on what matters now and what you expect to need next.",
          "Think about the kind of help you prefer: a clear plan you can put into action yourself, regular meetings and follow-up, or someone who manages specific financial tasks for you.",
        ],
        points: [
          "What financial decision do I want help making?",
          "Do I want a one-time project or an ongoing relationship?",
          "What level of support and communication would feel useful?",
        ],
      },
      {
        heading: "Look beyond the title",
        paragraphs: [
          "Job titles and credentials can be useful starting points, but they do not tell the whole story. Ask about relevant experience, the types of clients the advisor works with, and the services they actually provide.",
          "Ask the advisor to explain their recommendations in plain language. A good conversation should leave you clearer about your options, not pressured to make a quick decision.",
        ],
      },
      {
        heading: "Compare the full relationship",
        paragraphs: [
          "Consider how often you will meet, how quickly questions are answered, whether meetings are virtual or in person, and whether the advisor has account or investment minimums. These practical details can matter as much as expertise.",
          "Before moving forward, request the agreement and review the services, costs, and responsibilities in writing. Take time to compare options and ask follow-up questions.",
        ],
      },
      {
        heading: "Verify important details",
        paragraphs: [
          "Check professional registrations, disciplinary information, and credentials through the relevant regulator or issuing organization. Confirm that the person and firm you researched are the same ones you would be engaging.",
        ],
      },
    ],
  },
  {
    slug: "understanding-advisor-fee-structures",
    category: "Costs & services",
    title: "Understanding advisor fee structures",
    summary:
      "Learn the common ways financial advice is priced and what to ask so you can understand the total cost.",
    readTime: "6 min read",
    introduction:
      "Financial advice can be priced in different ways, and the same advisor may use more than one method. Ask for a written explanation of every cost that could apply to your situation before agreeing to a service.",
    sections: [
      {
        heading: "Common ways advice is priced",
        paragraphs: [
          "An asset-based fee is usually calculated as a percentage of the assets being managed. A flat fee may cover a defined project or an ongoing service. An hourly fee is based on time spent, while a subscription or retainer may provide continuing access for a recurring charge.",
          "Some professionals may receive commissions from financial products. The details vary by product and arrangement, so ask what compensation could be received and how it relates to the recommendations being made.",
        ],
      },
      {
        heading: "Ask what the quoted fee includes",
        paragraphs: [
          "A headline rate does not always describe the full cost. Find out whether planning, investment management, implementation, account services, and follow-up meetings are included or billed separately.",
        ],
        points: [
          "How is the fee calculated, and when is it charged?",
          "Are there account, transaction, fund, or product expenses in addition to your fee?",
          "Could the advisor receive commissions or other compensation?",
          "What happens to the cost if my circumstances or assets change?",
        ],
      },
      {
        heading: "Compare like with like",
        paragraphs: [
          "When comparing proposals, match the service scope as closely as possible. One price may include a detailed financial plan and regular reviews, while another may cover only investment management.",
          "Ask for an example of the total expected cost using a situation similar to yours. The goal is not simply to find the lowest fee, but to understand what you receive and how the arrangement works.",
        ],
      },
      {
        heading: "Get the details in writing",
        paragraphs: [
          "Review the engagement agreement and any required disclosures before you sign. If a fee, service, or term is unclear, ask for an explanation in writing and take the time you need to consider it.",
        ],
      },
    ],
  },
  {
    slug: "questions-to-ask-before-hiring-an-advisor",
    category: "Your first meeting",
    title: "Questions to ask before hiring an advisor",
    summary:
      "Use these conversation starters to understand an advisor’s experience, services, costs, and approach.",
    readTime: "5 min read",
    introduction:
      "An introductory meeting is a chance to understand how an advisor works and whether their services match your needs. Bring a short list of questions, and notice whether the answers are clear, specific, and focused on your situation.",
    sections: [
      {
        heading: "Experience and expertise",
        paragraphs: [
          "Ask about the advisor’s training, registrations, and experience with situations like yours. You can also ask how they keep their knowledge current and where to verify their credentials.",
        ],
        points: [
          "What kinds of financial needs do you commonly help with?",
          "What licenses or credentials do you hold, and where can I verify them?",
          "Who will I work with day to day?",
        ],
      },
      {
        heading: "Services and recommendations",
        paragraphs: [
          "Understand exactly what the relationship includes. Ask how recommendations are developed, how they connect to your wider financial picture, and what happens after an initial plan is delivered.",
          "Ask how the advisor will explain choices, alternatives, risks, and trade-offs. You should have enough information to understand the reasoning behind a recommendation.",
        ],
      },
      {
        heading: "Fees and conflicts",
        paragraphs: [
          "Ask how the advisor is paid, what other costs may apply, and whether compensation could vary based on the services or products recommended. Request the explanation and relevant disclosures in writing.",
        ],
      },
      {
        heading: "Communication and fit",
        paragraphs: [
          "A good working relationship should fit your communication preferences. Discuss meeting frequency, typical response times, who you can contact, and how you will review progress together.",
          "There is no need to decide during the first conversation. Take time to compare what you heard, verify important details, and ask any questions that remain.",
        ],
      },
    ],
  },
];
