export type BrokerCheckRecord = {
  name: string;
  crd: string;
  firm: string | null;
  city: string | null;
  state: string | null;
  registrations: ("Broker" | "Investment adviser")[];
  experience: string | null;
  disclosures: "none-reported" | "see-sec";
};

export const brokerCheckRetrievedAt = "2026-10-20";

export const brokerCheckRecords: BrokerCheckRecord[] = [
  { name: "Bernard Fred Adam IV", crd: "7897722", firm: null, city: null, state: null, registrations: [], experience: "<1", disclosures: "none-reported" },
  { name: "Ryan Christopher Adam", crd: "6117896", firm: "Merrill Lynch, Pierce, Fenner & Smith Incorporated", city: "Pennington", state: "NJ", registrations: ["Broker", "Investment adviser"], experience: "13", disclosures: "none-reported" },
  { name: "Mathew Shawn Ryan", crd: "6796866", firm: "TIAA-CREF Individual & Institutional Services, LLC", city: "Charlotte", state: "NC", registrations: ["Broker"], experience: "9", disclosures: "none-reported" },
  { name: "Thomas P. Ryan", crd: "6371900", firm: "Merrill Lynch, Pierce, Fenner & Smith Incorporated", city: "Boston", state: "MA", registrations: ["Broker", "Investment adviser"], experience: "11", disclosures: "none-reported" },
  { name: "Walter Scott Thomas", crd: "7993963", firm: "GoalFusion Wealth Management", city: "Georgetown", state: "TX", registrations: ["Investment adviser"], experience: null, disclosures: "see-sec" },
  { name: "Craig Justin Walter", crd: "2784070", firm: "BofA Securities, Inc.", city: "New York", state: "NY", registrations: ["Broker"], experience: "28", disclosures: "none-reported" },
  { name: "Tyler Hayden Craig", crd: "4167951", firm: "Vanguard Marketing Corporation", city: "Scottsdale", state: "AZ", registrations: ["Broker", "Investment adviser"], experience: "22", disclosures: "none-reported" },
  { name: "Roderic Allan Craig", crd: "2486205", firm: "Cetera Wealth Services, LLC", city: "Rancho Cordova", state: "CA", registrations: ["Broker"], experience: "32", disclosures: "none-reported" },
  { name: "Allan Lee McClure", crd: "6100795", firm: "Ameriprise Financial Services, LLC", city: "Birmingham", state: "AL", registrations: ["Broker", "Investment adviser"], experience: "14", disclosures: "none-reported" },
  { name: "Creston Welby Saunders", crd: "4490644", firm: "Wells Fargo Clearing Services, LLC", city: "Kilmarnock", state: "VA", registrations: ["Broker", "Investment adviser"], experience: "24", disclosures: "none-reported" },
  { name: "Wendy Lee Welbaum", crd: "5722290", firm: "Ameriprise Financial Services, LLC", city: "Rochester", state: "MI", registrations: ["Broker"], experience: "14", disclosures: "none-reported" },
  { name: "Wendy Kay Bryant", crd: "2862982", firm: "Northwestern Mutual Investment Services, LLC", city: "West Des Moines", state: "IA", registrations: ["Broker", "Investment adviser"], experience: "27", disclosures: "none-reported" },
  { name: "Anna Hsiao-Wei Hsu", crd: "2406656", firm: "Loop Capital Markets LLC", city: "Chicago", state: "IL", registrations: ["Broker"], experience: "22", disclosures: "none-reported" },
  { name: "John Paul Adams", crd: "3142262", firm: null, city: null, state: null, registrations: [], experience: "22", disclosures: "none-reported" },
  { name: "Motisola Zola Kendrick", crd: "4498611", firm: "TIAA-CREF Individual & Institutional Services, LLC", city: "Charlotte", state: "NC", registrations: ["Broker"], experience: "17", disclosures: "none-reported" },
  { name: "James Mark Brooks", crd: "2387172", firm: "Equitable Distributors, LLC", city: "Charlotte", state: "NC", registrations: ["Broker"], experience: "32", disclosures: "none-reported" },
  { name: "Laura Elizabeth Roman", crd: "1864861", firm: "State Street Global Advisors Funds Distributors, LLC", city: "Boston", state: "MA", registrations: ["Broker"], experience: "36", disclosures: "none-reported" },
  { name: "Timothy Robert Reid", crd: "5769186", firm: "NYLife Securities LLC", city: null, state: null, registrations: ["Broker"], experience: "16", disclosures: "none-reported" },
  { name: "Jocelyn Marie Booth", crd: "6260013", firm: "Vanguard Marketing Corporation", city: "Malvern", state: "PA", registrations: ["Broker"], experience: "12", disclosures: "none-reported" },
  { name: "Jonathan Mark Wren", crd: "6041698", firm: "Farmers Financial Solutions, LLC", city: "Olathe", state: "KS", registrations: ["Broker"], experience: "13", disclosures: "none-reported" },
  { name: "Elodie Augezque Blanc", crd: "6006243", firm: "Citigroup Global Markets Inc.", city: "New York", state: "NY", registrations: ["Broker"], experience: "14", disclosures: "none-reported" },
  { name: "Talia Marie Comita", crd: "4810188", firm: "Vanguard Marketing Corporation", city: "Malvern", state: "PA", registrations: ["Broker"], experience: "22", disclosures: "none-reported" },
  { name: "Daphne Lynette Williams", crd: "3238501", firm: null, city: null, state: null, registrations: [], experience: "19", disclosures: "none-reported" },
  { name: "Laurel Elaine White", crd: "4132712", firm: null, city: null, state: null, registrations: [], experience: "22", disclosures: "none-reported" },
  { name: "Colette Michelle Lyle", crd: "2810500", firm: "LPL Financial LLC", city: "Austin", state: "TX", registrations: ["Broker"], experience: "18", disclosures: "none-reported" },
  { name: "Brian David Fox", crd: "2798809", firm: "Stifel, Nicolaus & Company, Incorporated", city: "San Francisco", state: "CA", registrations: ["Broker"], experience: "29", disclosures: "none-reported" },
  { name: "James Vincent McKenna", crd: "4089007", firm: null, city: null, state: null, registrations: [], experience: "22", disclosures: "none-reported" },
  { name: "Todd Ryan Cassidy", crd: "5155469", firm: "Triple P Securities, LLC", city: "Chicago", state: "IL", registrations: ["Broker"], experience: "19", disclosures: "none-reported" },
  { name: "Ronnie Lee Thomas", crd: "2970387", firm: null, city: null, state: null, registrations: [], experience: "17", disclosures: "none-reported" },
  { name: "Luisa Josefina Serena", crd: "4421245", firm: "Investment Placement Group", city: "San Diego", state: "CA", registrations: ["Broker", "Investment adviser"], experience: "20", disclosures: "none-reported" },
  { name: "Rosalie Marie Ciaio", crd: "4906198", firm: "Cetera Wealth Services, LLC", city: "Brooklyn", state: "NY", registrations: ["Broker"], experience: "21", disclosures: "none-reported" },
  { name: "Calvin Marcus Hardy", crd: "3240215", firm: "Pershing LLC", city: "Lake Mary", state: "FL", registrations: ["Broker"], experience: "27", disclosures: "none-reported" },
  { name: "Jack Pickardt Pierce", crd: "4710280", firm: null, city: null, state: null, registrations: [], experience: "20", disclosures: "none-reported" },
  { name: "Kyle James Theodore", crd: "3121716", firm: null, city: null, state: null, registrations: [], experience: "22", disclosures: "none-reported" },
  { name: "Stephen Lawrence Vaughn", crd: "3210588", firm: "Allstate Financial Services, LLC", city: "Littleton", state: "CO", registrations: ["Broker", "Investment adviser"], experience: "19", disclosures: "none-reported" },
  { name: "Martha Jeanne Bill", crd: "4784056", firm: null, city: null, state: null, registrations: [], experience: "16", disclosures: "none-reported" },
  { name: "Thomas James Griffin", crd: "5661753", firm: "HSBC Securities (USA) Inc.", city: "Buffalo", state: "NY", registrations: ["Broker", "Investment adviser"], experience: "17", disclosures: "none-reported" },
  { name: "Eli Sanders", crd: "6320067", firm: "D.A. Davidson & Co.", city: "Seattle", state: "WA", registrations: ["Broker", "Investment adviser"], experience: "11", disclosures: "none-reported" },
  { name: "Tina Renee Graves", crd: "5889228", firm: "MWA Financial Services Inc.", city: "Lexington", state: "TN", registrations: ["Broker"], experience: "14", disclosures: "none-reported" },
  { name: "Mary Elizabeth Nolan", crd: "5186406", firm: "Merrill Lynch, Pierce, Fenner & Smith Incorporated", city: "Ann Arbor", state: "MI", registrations: ["Broker", "Investment adviser"], experience: "20", disclosures: "none-reported" },
  { name: "Barry Campbell Preston", crd: "4931031", firm: "UBS Securities LLC", city: "New York", state: "NY", registrations: ["Broker"], experience: "18", disclosures: "none-reported" },
  { name: "Rhett Allen Meadows", crd: "6128205", firm: "Hines Private Wealth Solutions LLC", city: "Houston", state: "TX", registrations: ["Broker"], experience: "13", disclosures: "none-reported" },
];

export function brokerCheckUrl(crd: string) {
  return `https://brokercheck.finra.org/individual/summary/${crd}`;
}
