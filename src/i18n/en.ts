// Every piece of text the app shows in English. Same shape as zh-TW.ts.
// Written as natural product copy, not word-for-word translation.

import type { Translations } from "./index"

const pad2 = (value: number) => String(value).padStart(2, "0")

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const shortMonth = (month: number) => monthNames[month - 1].slice(0, 3)

const plural = (count: number, one: string, many: string) =>
  `${count} ${count === 1 ? one : many}`

const clock = (hour: number, minute: number) =>
  `${hour % 12 || 12}:${pad2(minute)} ${hour < 12 ? "AM" : "PM"}`

// shortcut: anything not from today is labelled Yesterday; see zh-TW.ts.
const dayTime = (date: Date, isToday: boolean) => {
  const time = clock(date.getHours(), date.getMinutes())
  return isToday ? time : `Yesterday ${time}`
}

export const en: Translations = {
  meta: {
    htmlLang: "en",
    documentTitle: "SuiLa | Daily water reminder",
  },
  brand: {
    name: "水啦",
    latin: "SuiLa",
    aria: "SuiLa home",
  },
  nav: {
    aria: "Main tabs",
    water: "Water",
    family: "Family",
    my: "Me",
    newMessages: (count: number) => plural(count, "new message", "new messages"),
  },
  common: {
    save: "Save",
    back: "Back",
    on: "On",
    off: "Off",
    listSeparator: ", ",
    ml: "ml",
    clock,
    dayTime,
    unsaved: "You haven't saved. Leave anyway?",
    leave: "Leave without saving",
    stay: "Keep editing",
    speechLang: "en-US",
  },
  home: {
    aria: "Water log",
    notPaired: "No base paired yet",
    pairButton: "Pair the base",
    deviceConnected: "Base connected",
    deviceDisconnected: "Base not connected",
    battery: (percent: number) => `Battery ${percent}%`,
    batteryLow: (percent: number) => `Battery low (${percent}%). Please charge.`,
    pendingSync: (count: number) =>
      `${plural(count, "record", "records")} waiting to sync`,
    calendar: "Calendar",
    statusOk: (percent: number) => `Connected · ${percent}% battery`,
    statusOffline: (waiting: number) =>
      waiting > 0 ? `Offline · ${waiting} waiting to sync` : "Offline",
    baseTitle: "Base",
    noNewMessages: "No new messages",
    remaining: (ml: number) => `${ml} ml to go`,
    weekMore: "See full analysis",
    todayWater: "Today's water",
    ringAria: (drunk: number, goal: number, percent: number) =>
      `${drunk} ml so far today, goal ${goal} ml, ${percent} percent done. Tap to add water yourself.`,
    drunkLabel: "So far",
    goalLine: (goal: number) => `of ${goal} ml`,
    percentDone: (percent: number) => `${percent}% of your goal`,
    goalMet: (percent: number) => `Goal reached: ${percent}%`,
    addWater: "Add water",
    newMessages: (count: number) =>
      plural(count, "new voice message", "new voice messages"),
    todayRecords: "Today",
    noRecords: "Nothing logged yet today",
    noRecordsHint:
      "Put the bottle back on the base after you drink and it logs itself. You can also tap “Add water”.",
    edit: "Edit",
    editAria: (time: string) => `Edit the ${time} record`,
    addedToast: (ml: number) => `Added ${ml} ml`,
    recordAmount: (ml: number) => `${ml} ml`,
  },
  editRecord: {
    title: "Edit record",
    heading: (time: string) => `${time} record`,
    amount: "Amount (ml)",
    hint: (min: number, max: number) => `Enter a number from ${min} to ${max}`,
    delete: "Delete this record",
    deleteConfirm: (time: string, amount: string) =>
      `Delete the ${time} record of ${amount}?`,
    deleteYes: "Delete",
    deleteNo: "Cancel",
    updatedToast: "Record updated",
    deletedToast: "Record deleted",
  },
  family: {
    aria: "Family",
    notConnectedIntro:
      "Link LINE so your family can see how much you drink and send you voice messages.",
    joinLine: "Link LINE",
    connectedToast: "LINE linked",
    connectedHeading: (count: number) =>
      `${plural(count, "family member", "family members")} linked through LINE`,
    voiceTitle: "Voice messages",
    noMessages: "No voice messages yet",
    play: "Play",
    stop: "Stop",
    playAria: (name: string) => `Play the message from ${name}`,
    stopAria: (name: string) => `Stop the message from ${name}`,
    newTag: "New",
    duration: (seconds: number) => `${seconds} sec`,
    messageText: {
      m1: "Mom, it's really hot today. Remember to drink some water.",
      m2: "Mom, I'm coming home this weekend. Don't forget your water.",
      m3: "Good night, Mom. I'll call you tomorrow.",
    },
    addMember: "Add a family member",
    addMemberHint: (freeLimit: number) =>
      `The free plan allows ${freeLimit}. Upgrade to Pro to add more.`,
    personLabel: (relation: string, name: string) => `${name} (${relation})`,
    people: {
      daughter: { relation: "daughter", name: "Ya-Ting", initial: "Y" },
      son: { relation: "son", name: "Chih-Ming", initial: "C" },
    },
  },
  my: {
    aria: "Me",
    profile: "Profile",
    reminders: "Reminders",
    nightMute: "Night mute",
    device: "Base",
    habits: "Habits",
    proTag: "Pro",
    about: "About",
    proTitle: "Upgrade to Pro",
    proSubtitle: "Unlock habit analysis and more family members",
    language: "語言 / Language",
    languageNames: { "zh-TW": "繁體中文", en: "English" },
  },
  reminders: {
    title: "Reminders",
    goalLabel: "Daily water goal",
    goalValue: (ml: number) => `${ml} ml`,
    decrease: (step: number) => `− ${step}`,
    increase: (step: number) => `+ ${step}`,
    decreaseAria: (step: number) => `Lower by ${step} ml`,
    increaseAria: (step: number) => `Raise by ${step} ml`,
    healthNote: "Please set your water goal as your doctor or nurse advises.",
    timesLabel: "Reminder times",
    noTimes: "No reminder times yet",
    remove: "Remove",
    removeAria: (time: string) => `Remove the ${time} reminder`,
    addTimeAria: "Choose a reminder time to add",
    add: "Add",
    brightnessLabel: "Base light brightness",
    brightness: { low: "Low", medium: "Mid", high: "High" },
    savedToast: "Reminder settings saved",
  },
  device: {
    title: "Base",
    baseName: "SuiLa base",
    pairedTo: (name: string) => `Paired with ${name}`,
    repair: "Pair again",
    legendTitle: "What the light colors mean",
    lights: {
      blue: { name: "Blue", meaning: "Time to drink" },
      white: { name: "White", meaning: "Measuring how much you drank" },
      red: { name: "Red", meaning: "Battery low" },
    },
  },
  pairing: {
    title: "Pair base",
    stepsLabel: "How to pair",
    steps: [
      "Turn the base on",
      "Hold your phone close to the base",
      "Tap “Start pairing”",
    ],
    start: "Start pairing",
    searching: "Looking for the base…",
    success: "Paired",
    done: "Done",
  },
  habits: {
    title: "Habits",
    weekTitle: "Last 7 days",
    dayLabel: (month: number, day: number, weekday: string) =>
      `${weekday} ${month}/${day}`,
    metLegend: "means the goal was reached that day",
    metCount: (met: number, days: number) =>
      `Goal reached on ${met} of ${days} days`,
    average: (ml: number) => `${ml} ml a day on average`,
    forgetTitle: "When you most often forget to drink",
    period: (from: string, to: string) => `${from} to ${to}`,
    forgetBody:
      "Over the last 7 days, this is when the fewest drinks were logged.",
    addReminder: "Add a reminder time",
    notEnough: "Not enough records yet. Check back in a few days.",
  },
  demo: {
    title: "Demo",
    hint: "For presentations only. Regular users never see this page.",
    data: "Data",
    dataNormal: "Normal (six weeks of records)",
    dataDayOne: "Day one (no records)",
    device: "Base",
    deviceConnected: "Connected",
    deviceOffline: (count: number) =>
      `Offline (${plural(count, "record", "records")} waiting)`,
    deviceUnpaired: "Not paired yet",
    battery: "Battery",
    batteryNormal: (percent: number) => `Normal ${percent}%`,
    batteryLow: (percent: number) => `Low ${percent}%`,
    line: "LINE",
    lineOn: "Linked",
    lineOff: "Not linked",
    pro: "Pro",
    proOff: "Off",
    proOn: "On",
    homeStyle: "Home style",
    homeStyles: {
      blueTop: "Blue top",
      glass: "Water glass",
      tiles: "Colour tiles",
      calm: "Clean and calm",
    },
    reset: "Reset everything",
  },
  pro: {
    title: "SuiLa Pro",
    habitTitle: "Habit analysis",
    habitBody:
      "See your week of drinking and the time of day you most often forget.",
    familyTitle: "More family members",
    familyBody: (freeLimit: number) =>
      `The free plan links ${plural(freeLimit, "family member", "family members")}. Pro links more.`,
    bluetoothFree: "Pairing the base by Bluetooth is always free",
  },
  calendar: {
    aria: "Water calendar",
    title: "Calendar",
    monthTitle: (year: number, month: number) =>
      `${monthNames[month - 1]} ${year}`,
    prevMonth: "Previous month",
    nextMonth: "Next month",
    weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    weekdayNames: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dayAria: (month: number, day: number, total: number | null, met: boolean) =>
      `${monthNames[month - 1]} ${day}: ${
        total === null
          ? "nothing logged"
          : `${total} ml, goal ${met ? "reached" : "not reached"}`
      }`,
    dayTitle: (month: number, day: number, weekday: string, isToday: boolean) =>
      `${weekday}, ${shortMonth(month)} ${day}${isToday ? " (today)" : ""}`,
    drunk: (ml: number, goal: number) => `${ml} of ${goal} ml`,
    met: "Goal reached",
    notMet: "Goal not reached",
    noRecords: "Nothing logged this day",
    legendMet: "Goal reached",
    legendSome: "Logged, goal not reached",
    prevDay: "Previous day",
    nextDay: "Next day",
  },
  addWater: {
    title: "Add water",
    cupAria: (percent: number) => `Cup ${percent} percent full`,
    ready: (ml: number) => `Ready to add ${ml} ml`,
    prompt: "Choose or type how much you drank",
    quickLabel: "Common amounts",
    inputLabel: "Or type an amount",
    placeholder: "0",
    add: "Add",
  },
  profile: {
    aria: "Profile",
    title: "Profile",
    defaultName: "Mei-Ling",
    name: "Name",
    namePlaceholder: "Your name",
    height: "Height (cm)",
    weight: "Weight (kg)",
    conditions: "Long-term health conditions",
    choose: "Please choose",
    conditionLabels: {
      hypertension: "High blood pressure",
      diabetes: "Diabetes",
      heart: "Heart disease",
      kidney: "Kidney disease",
      none: "None",
      other: "Other",
    },
  },
  night: {
    aria: "Night mute times",
    title: "Night mute",
    enable: "Night mute",
    start: "Start time",
    end: "End time",
    savedToast: "Night mute saved",
  },
  about: {
    title: "About",
    description:
      "SuiLa is a smart base that sits under your water bottle and works with this app. Put the bottle back after you drink and it logs how much you drank. If you go too long without drinking, it reminds you with a soft light.",
    demoTitle: "Course project demo",
    demoBody:
      "This is a project for a startup course. Everything shown here is sample data.",
  },
}
