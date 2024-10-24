#!/usr/bin/env node

import { Command } from "commander";
import { DateTime } from "luxon";

function printCalendar(year, month) {
  if (year < 1900 || year > 2100 || month < 1 || month > 12) {
    console.error(
      "指定された年または月が無効です。(年:1900〜2100,月:1〜12が有効)",
    );
    process.exit(1);
  }

  const headerYear = year.toString();
  const headerMonth = `${month}月`;
  const headerMargin = month >= 10 ? 9 : 8;

  console.log(`${headerMonth.padStart(headerMargin)} ${headerYear}`);
  console.log("日 月 火 水 木 金 土");

  const firstDay = DateTime.local(year, month, 1);
  const lastDay = firstDay.endOf("month");
  const padding = " ".repeat((firstDay.weekday % 7) * 3);
  process.stdout.write(padding);

  for (let day = firstDay; day <= lastDay; day = day.plus({ days: 1 })) {
    const padStartBetweenDay = 2;
    const formattedDay = day.day.toString().padStart(padStartBetweenDay);

    if (day.weekday === 6 || day.hasSame(lastDay, "day")) {
      console.log(formattedDay);
    } else {
      process.stdout.write(`${formattedDay} `);
    }
  }

  if (lastDay.weekday !== 6) {
    console.log();
  }
}

function main() {
  const program = new Command();

  program
    .option("-y, --year <year>", "年を指定", parseInt)
    .option("-m, --month <month>", "月を指定", parseInt)
    .parse(process.argv);

  const options = program.opts();
  const now = DateTime.now();
  const year = options.year ?? now.year;
  const month = options.month ?? now.month;

  printCalendar(year, month);
}

main();
