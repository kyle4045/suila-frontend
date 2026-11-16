// Every piece of text the app shows in 繁體中文, including aria labels,
// mock names, dates, times and units. Components never contain text.

const pad2 = (value: number) => String(value).padStart(2, "0")

export const zhTW = {
  brand: {
    name: "水啦",
    latin: "SuiLa",
    aria: "水啦 SuiLa 首頁",
  },
  nav: {
    aria: "主要分頁",
    water: "喝水",
    family: "社交",
    my: "我的",
  },
  common: {
    save: "儲存",
    listSeparator: "、",
    mlShort: "ml",
  },
  home: {
    aria: "飲水紀錄",
    statusOk: "一切正常",
    openCalendar: "開啟日曆",
    todayWater: "今天喝水量",
    ringAria: (percent: number) =>
      `今天喝水目標已完成百分之${percent}，點擊額外補水`,
    percent: (percent: number) => `${percent}%`,
    recentRecords: "最近紀錄",
    recordAmount: (ml: number) => `${ml} 毫升`,
    // shortcut: anything not from today is labelled 昨天; the mock data only
    // covers two days. Needs real dates once older records are shown.
    recordTime: (date: Date, isToday: boolean) => {
      const hour = date.getHours()
      const period = hour < 12 ? "上午" : hour === 12 ? "中午" : "下午"
      const clock = `${period} ${hour % 12 || 12}:${pad2(date.getMinutes())}`
      return isToday ? clock : `昨天 ${clock}`
    },
  },
  family: {
    aria: "社交",
    joinLine: "加入 LINE",
    lineConnected: "你的 LINE 已連接",
    personLabel: (relation: string, name: string) => `${relation} ${name}`,
    people: {
      daughter: { relation: "女兒", name: "雅婷", initial: "雅" },
      son: { relation: "兒子", name: "志明", initial: "志" },
      carer: { relation: "照護員", name: "林小姐", initial: "林" },
    },
  },
  my: {
    aria: "我的",
    profile: "基本資料",
    nightMute: "夜間靜音",
    about: "關於我們",
    proTitle: "升級 Pro",
    proSubtitle: "解鎖藍牙裝置連結",
  },
  calendar: {
    aria: "喝水提醒日曆",
    year: (year: number) => `${year} 年`,
    month: (month: number) => `${month} 月`,
    selectMonth: "選擇月份",
    close: "關閉日曆",
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    dayAria: (month: number, day: number, hasReminders: boolean) =>
      `${month} 月 ${day} 日${hasReminders ? "，有提醒紀錄" : ""}`,
    reminderCount: (count: number) => `提醒 ${count} 次`,
    reminderIndex: (index: number) => `${index}.`,
    empty: "這天沒有提醒紀錄",
  },
  addWater: {
    aria: "額外補水",
    title: "補水",
    close: "關閉額外補水",
    cupAria: (percent: number) => `水杯水位百分之${percent}`,
    ready: (ml: number) => `準備加入 ${ml} ml`,
    prompt: "請輸入這次喝水量",
    placeholder: "＿＿",
    inputAria: "額外補水量",
    add: "加入",
  },
  profile: {
    aria: "基本資料",
    close: "關閉基本資料",
    defaultName: "美玲",
    name: "姓名",
    namePlaceholder: "請輸入姓名",
    height: "身高（公分）",
    weight: "體重（公斤）",
    conditions: "慢性病或健康狀況",
    choose: "請選擇",
    conditionLabels: {
      hypertension: "高血壓",
      diabetes: "糖尿病",
      heart: "心臟病",
      kidney: "腎臟病",
      none: "無",
      other: "其他",
    },
  },
  night: {
    aria: "夜間靜音時間設定",
    close: "關閉夜間靜音設定",
    enable: "開啟夜間靜音",
    switchAria: "夜間靜音",
    start: "開始時間（24 小時制）",
    end: "結束時間（24 小時制）",
    startHour: "開始小時",
    startMinute: "開始分鐘",
    endHour: "結束小時",
    endMinute: "結束分鐘",
  },
}
