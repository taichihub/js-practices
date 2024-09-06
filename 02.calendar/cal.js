#!/usr/bin/env node

import { Command } from "commander";
import { DateTime } from "luxon";

const program = new Command();

program
  .option("-y, --year <year>", "年を指定", parseInt)
  .option("-m, --month <month>", "月を指定", parseInt)
  .parse(process.argv);

const options = program.opts();

function printCalendar(year, month) {
  if (
    !year ||
    !month ||
    year < 1900 ||
    year > 2100 ||
    month < 1 ||
    month > 12
  ) {
    process.stderr.write(
      "指定された年または月が無効です。(年:1900〜2100,月:1〜12が有効)\n",
    );
    return;
  }

  const firstDay = DateTime.local(year, month, 1);
  const lastDay = firstDay.endOf("month");

  process.stdout.write(firstDay.toFormat("M月 yyyy").padStart(13) + "\n");
  process.stdout.write("日 月 火 水 木 金 土\n");

  let padding = " ".repeat((firstDay.weekday % 7) * 3);
  process.stdout.write(padding);

  for (let day = firstDay; day <= lastDay; day = day.plus({ days: 1 })) {
    process.stdout.write(day.day.toString().padStart(2) + " ");
    if (day.weekday === 6) {
      process.stdout.write("\n");
    }
  }

  if (lastDay.weekday !== 6) {
    process.stdout.write("\n");
  }
}

function main() {
  const year = options.year || DateTime.now().year;
  const month = options.month || DateTime.now().month;

  try {
    printCalendar(year, month);
  } catch (error) {
    process.stderr.write(
      "無効な日付が指定されました。詳細: " + error.message + "\n",
    );
  }
}

main();
