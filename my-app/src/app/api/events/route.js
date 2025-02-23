import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

const filePath = path.join(process.cwd(), "public/data/events.csv");

export async function POST(req) {
  try {
    const newEvent = await req.json();
    const data = fs.readFileSync(filePath, "utf8");
    const parsedData = Papa.parse(data, { header: true });
    const updatedEvents = [...parsedData.data, newEvent];
    const csv = Papa.unparse(updatedEvents);
    fs.writeFileSync(filePath, csv, "utf8");
    return NextResponse.json({ message: "Event added successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
