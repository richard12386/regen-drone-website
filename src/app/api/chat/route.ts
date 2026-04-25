import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  SchemaType,
  type ObjectSchema,
} from "@google/generative-ai";
import dronesData from "@/data/drony.json";

type Drone = {
  id: number;
  name: string;
  price: number;
  category: string;
  tags: string[];
  desc: string;
};

type ChatResponse = {
  text: string;
  drones: Drone[];
};

const drones: Drone[] = dronesData as Drone[];

const RESPONSE_SCHEMA: ObjectSchema = {
  type: SchemaType.OBJECT,
  properties: {
    responseText: {
      type: SchemaType.STRING,
      description: "Ceska odpoved zakaznikovi. Max 3-4 vety.",
    },
    recommendedDroneIds: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.INTEGER },
      description: "ID dronu k doporuceni. Max 4.",
    },
  },
  required: ["responseText", "recommendedDroneIds"],
};

function createSystemInstruction() {
  return `Jsi AI poradce společnosti REGEN — výrobce prémiových dronových systémů.
Pomáháš zákazníkům vybrat správný dron z naší nabídky.

Pravidla:
- Odpovídej VŽDY v češtině, přátelsky a odborně.
- Doporučuj POUZE drony z níže uvedeného katalogu.
- Odpovídej stručně — maximálně 3-4 věty v responseText.
- Pokud se dotaz netýká REGEN dronů, zdvořile odmítni a přesměruj zákazníka.
- Zákazníci mohou psát bez háčků — snaž se je správně pochopit.
- V poli recommendedDroneIds uveď ID dronů (1–15) které doporučuješ (max 4). Prázdné pole [] pokud žádný konkrétní dron neodpovídá dotazu.

Katalog dronů REGEN:
${JSON.stringify(drones, null, 2)}`;
}

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function formatPrice(price: number) {
  return `${price.toLocaleString("cs-CZ")} Kč`;
}

function buildResponse(text: string, selected: Drone[] = []): ChatResponse {
  return {
    text,
    drones: selected.slice(0, 4),
  };
}

function byId(id: number) {
  return drones.find((drone) => drone.id === id);
}

function fallbackReply(message: string): ChatResponse {
  const query = normalize(message);

  if (
    query.includes("nejlevnejsi") ||
    query.includes("nejlevnejsi dron") ||
    query.includes("nejlevnejsi model") ||
    query.includes("nejlevnější")
  ) {
    const cheapest = drones.reduce((min, drone) =>
      drone.price < min.price ? drone : min
    );

    return buildResponse(
      `Nejlevnější dron v naší nabídce je ${cheapest.name} za ${formatPrice(
        cheapest.price
      )}. Je vhodný hlavně pro začátečníky a základní létání. Pokud chcete, můžu vám rovnou doporučit i nejlepší levný model na cestování nebo FPV.`,
      [cheapest]
    );
  }

  if (query.includes("nejdrazsi") || query.includes("nejdražší")) {
    const mostExpensive = drones.reduce((max, drone) =>
      drone.price > max.price ? drone : max
    );

    return buildResponse(
      `Nejdražší model v katalogu je ${mostExpensive.name} za ${formatPrice(
        mostExpensive.price
      )}. Jde o specializovaný profesionální systém pro náročné strategické nasazení.`,
      [mostExpensive]
    );
  }

  if (
    query.includes("cestov") ||
    query.includes("travel") ||
    query.includes("na cesty")
  ) {
    const matches = drones.filter(
      (drone) =>
        normalize(drone.category).includes("osobni") ||
        drone.tags.some((tag) => normalize(tag).includes("cestov"))
    );

    return buildResponse(
      "Na cestování bych doporučil hlavně REGEN AirSnap a REGEN TravelFly. AirSnap je kompaktnější a cenově dostupnější, TravelFly nabídne delší výdrž a praktičtější skládací konstrukci.",
      matches
    );
  }

  if (
    query.includes("firma") ||
    query.includes("firemni") ||
    query.includes("prumysl") ||
    query.includes("inspek") ||
    query.includes("podnik")
  ) {
    const matches = drones.filter((drone) =>
      ["REGEN Inspect", "REGEN AgroScan"].includes(drone.name)
    );

    return buildResponse(
      "Pro firmy se nejvíc hodí REGEN Inspect a REGEN AgroScan. Inspect je silný na inspekce a technické provozy, AgroScan je lepší volba pro zemědělství, mapování a analýzu ploch.",
      matches
    );
  }

  if (
    query.includes("fpv") ||
    query.includes("zavod") ||
    query.includes("race") ||
    query.includes("racing")
  ) {
    const matches = drones.filter((drone) =>
      ["REGEN Vortex", "REGEN Falcon"].includes(drone.name)
    );

    return buildResponse(
      "Na FPV a závody doporučuji REGEN Vortex nebo REGEN Falcon. Vortex je výkonnější pro pokročilé piloty, Falcon je dostupnější a vhodný jako vstup do FPV světa.",
      matches
    );
  }

  if (
    query.includes("zachran") ||
    query.includes("rescue") ||
    query.includes("medic") ||
    query.includes("termokamera")
  ) {
    const matches = drones.filter((drone) =>
      ["REGEN RescueEye", "REGEN MedDrop"].includes(drone.name)
    );

    return buildResponse(
      "Pro záchranářské nasazení jsou nejlepší REGEN RescueEye a REGEN MedDrop. RescueEye je ideální pro pátrání díky termokameře, MedDrop se hodí na rychlou přepravu zdravotnického materiálu.",
      matches
    );
  }

  if (
    query.includes("obrana") ||
    query.includes("strateg") ||
    query.includes("bezpecnost") ||
    query.includes("monitoring")
  ) {
    const matches = drones.filter((drone) =>
      [
        "REGEN Skybridger",
        "REGEN Sentinel",
        "REGEN Guardian",
        "REGEN Skydiver",
      ].includes(drone.name)
    );

    return buildResponse(
      "Pro strategické a bezpečnostní použití doporučuji hlavně REGEN Sentinel, Guardian a Skybridger. Každý z nich cílí na jiný typ nasazení — monitoring, ochranu perimetru nebo logistické mise.",
      matches
    );
  }

  if (query.includes("nejlepsi") || query.includes("doporu")) {
    const matches = [byId(1), byId(4), byId(8), byId(6)].filter(
      (drone): drone is Drone => Boolean(drone)
    );

    return buildResponse(
      "Záleží na použití, ale jako rychlý výběr bych doporučil AirSnap na osobní létání, Inspect pro firmy, Vortex na FPV a RescueEye pro záchranářské použití. Když mi napíšete účel, vyberu vám přesně nejlepší model.",
      matches
    );
  }

  return buildResponse(
    "Rád poradím s výběrem REGEN dronu. Napište mi prosím, jestli hledáte dron na cestování, pro firmu, FPV závody, záchranné použití nebo náročné profesionální mise."
  );
}

async function aiReply(message: string): Promise<ChatResponse | null> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: createSystemInstruction(),
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
      temperature: 0.7,
      maxOutputTokens: 512,
    },
  });

  const result = await model.generateContent(message);
  const raw = result.response.text();

  const parsed = JSON.parse(raw) as {
    responseText: string;
    recommendedDroneIds: number[];
  };

  const recommendedDrones = (parsed.recommendedDroneIds ?? [])
    .map((id) => drones.find((drone) => drone.id === id))
    .filter((drone): drone is Drone => drone !== undefined)
    .slice(0, 4);

  return {
    text: parsed.responseText,
    drones: recommendedDrones,
  };
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const message: string = (body.message ?? "").trim();

  if (!message) {
    return NextResponse.json(
      { error: "Zpráva nesmí být prázdná." },
      { status: 400 }
    );
  }

  try {
    const response = await aiReply(message);

    if (response) {
      return NextResponse.json(response);
    }
  } catch {
    // Fall through to deterministic local fallback.
  }

  return NextResponse.json(fallbackReply(message));
}
