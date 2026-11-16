// Every piece of text the app shows in 繁體中文, including aria labels,
// mock names, dates, times and units. Components never contain text.

const pad2 = (value: number) => String(value).padStart(2, "0")

// shortcut: anything not from today is labelled 昨天; the mock data only
// covers two days. Needs real dates once older items are shown.
const clock = (hour: number, minute: number) => {
  const period =
    hour < 6 ? "凌晨" : hour < 12 ? "上午" : hour === 12 ? "中午" : "下午"
  return `${period} ${hour % 12 || 12}:${pad2(minute)}`
}

const dayTime = (date: Date, isToday: boolean) => {
  const time = clock(date.getHours(), date.getMinutes())
  return isToday ? time : `昨天 ${time}`
}

export const zhTW = {
  brand: {
    name: "水啦",
    latin: "SuiLa",
    aria: "水啦 SuiLa 首頁",
  },
  nav: {
    aria: "主要分頁",
    water: "喝水",
    family: "家人",
    my: "我的",
    newMessages: (count: number) => `${count} 則新留言`,
  },
  common: {
    save: "儲存",
    back: "返回",
    on: "已開啟",
    off: "已關閉",
    listSeparator: "、",
    ml: "毫升",
    clock,
    dayTime,
    unsaved: "還沒有儲存，要離開嗎？",
    leave: "離開不儲存",
    stay: "繼續修改",
    speechLang: "zh-TW",
  },
  home: {
    aria: "飲水紀錄",
    notPaired: "尚未配對底座",
    pairButton: "配對底座",
    deviceConnected: "底座已連線",
    deviceDisconnected: "底座未連線",
    battery: (percent: number) => `電量 ${percent}%`,
    batteryLow: (percent: number) => `電量偏低 ${percent}%，請充電`,
    pendingSync: (count: number) => `${count} 筆紀錄等待同步`,
    calendar: "日曆",
    todayWater: "今天喝水量",
    ringAria: (drunk: number, goal: number, percent: number) =>
      `今天已喝 ${drunk} 毫升，目標 ${goal} 毫升，完成百分之 ${percent}。點一下可以手動加水`,
    drunkLabel: "已喝",
    goalLine: (goal: number) => `/ ${goal} 毫升`,
    percentDone: (percent: number) => `完成 ${percent}%`,
    goalMet: (percent: number) => `今天已達標，完成 ${percent}%`,
    addWater: "手動加水",
    newMessages: (count: number) => `有 ${count} 則新的語音留言`,
    todayRecords: "今天的紀錄",
    noRecords: "今天還沒有紀錄",
    edit: "修改",
    editAria: (time: string) => `修改${time}的紀錄`,
    addedToast: (ml: number) => `已加入 ${ml} 毫升`,
    recordAmount: (ml: number) => `${ml} 毫升`,
  },
  editRecord: {
    title: "修改紀錄",
    heading: (time: string) => `${time} 的紀錄`,
    amount: "喝水量（毫升）",
    hint: (min: number, max: number) => `請輸入 ${min} 到 ${max} 的數字`,
    delete: "刪除這筆紀錄",
    deleteConfirm: (time: string, amount: string) =>
      `確定要刪除「${time}　${amount}」這筆紀錄嗎？`,
    deleteYes: "刪除",
    deleteNo: "取消",
    updatedToast: "已更新紀錄",
    deletedToast: "已刪除紀錄",
  },
  family: {
    aria: "家人",
    notConnectedIntro:
      "連結 LINE 後，家人可以看到你的喝水進度，也可以傳語音留言給你。",
    joinLine: "加入 LINE",
    connectedToast: "已連結 LINE",
    connectedHeading: (count: number) => `已透過 LINE 連結 ${count} 位家人`,
    voiceTitle: "語音留言",
    noMessages: "還沒有語音留言",
    play: "播放",
    stop: "停止",
    playAria: (name: string) => `播放${name}的留言`,
    stopAria: (name: string) => `停止播放${name}的留言`,
    newTag: "新",
    duration: (seconds: number) => `${seconds} 秒`,
    messageText: {
      m1: "媽，今天天氣很熱，記得多喝水喔。",
      m2: "媽，我週末回家看你，要記得喝水。",
      m3: "媽，晚安，明天再打給你。",
    },
    addMember: "新增家人",
    addMemberHint: (freeLimit: number) =>
      `免費版最多 ${freeLimit} 位，升級 Pro 可以新增更多`,
    personLabel: (relation: string, name: string) => `${relation} ${name}`,
    people: {
      daughter: { relation: "女兒", name: "雅婷", initial: "雅" },
      son: { relation: "兒子", name: "志明", initial: "志" },
    },
  },
  my: {
    aria: "我的",
    profile: "基本資料",
    reminders: "提醒設定",
    nightMute: "夜間靜音",
    device: "底座裝置",
    about: "關於我們",
    proTitle: "升級 Pro",
    proSubtitle: "解鎖習慣分析、連結更多家人",
  },
  reminders: {
    title: "提醒設定",
    goalLabel: "每日喝水目標",
    goalValue: (ml: number) => `${ml} 毫升`,
    decrease: (step: number) => `－ ${step}`,
    increase: (step: number) => `＋ ${step}`,
    decreaseAria: (step: number) => `減少 ${step} 毫升`,
    increaseAria: (step: number) => `增加 ${step} 毫升`,
    healthNote: "飲水目標請依醫護人員建議調整",
    timesLabel: "提醒時間",
    noTimes: "還沒有提醒時間",
    remove: "移除",
    removeAria: (time: string) => `移除${time}的提醒`,
    addTimeAria: "選擇要新增的提醒時間",
    add: "新增",
    brightnessLabel: "底座燈光亮度",
    brightness: { low: "低", medium: "中", high: "高" },
    savedToast: "已儲存提醒設定",
  },
  device: {
    title: "底座裝置",
    baseName: "水啦底座",
    pairedTo: (name: string) => `已配對：${name}`,
    repair: "重新配對",
    legendTitle: "燈光顏色說明",
    lights: {
      blue: { name: "藍色", meaning: "該喝水了" },
      white: { name: "白色", meaning: "正在計算喝水量" },
      red: { name: "紅色", meaning: "電量偏低" },
    },
  },
  pairing: {
    title: "配對底座",
    stepsLabel: "配對步驟",
    steps: ["把底座開機", "把手機靠近底座", "按「開始配對」"],
    start: "開始配對",
    searching: "正在尋找底座…",
    success: "配對成功",
    done: "完成",
  },
  pro: {
    title: "水啦 Pro",
    habitTitle: "習慣分析",
    habitBody: "查看每週喝水紀錄，以及最容易忘記喝水的時段。",
    familyTitle: "更多家人",
    familyBody: (freeLimit: number) =>
      `免費版可連結 ${freeLimit} 位家人，Pro 可連結更多家人。`,
    bluetoothFree: "藍牙連結底座永遠免費",
  },
  calendar: {
    aria: "喝水日曆",
    title: "日曆",
    monthTitle: (year: number, month: number) => `${year} 年 ${month} 月`,
    prevMonth: "上個月",
    nextMonth: "下個月",
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    weekdayNames: [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ],
    dayAria: (month: number, day: number, total: number | null, met: boolean) =>
      `${month} 月 ${day} 日，${
        total === null
          ? "沒有紀錄"
          : `已喝 ${total} 毫升，${met ? "已達標" : "未達標"}`
      }`,
    dayTitle: (month: number, day: number, weekday: string, isToday: boolean) =>
      `${month} 月 ${day} 日 ${weekday}${isToday ? "（今天）" : ""}`,
    drunk: (ml: number, goal: number) => `已喝 ${ml} / ${goal} 毫升`,
    met: "已達標",
    notMet: "未達標",
    noRecords: "這天沒有紀錄",
    legendMet: "達標",
    legendSome: "有紀錄，未達標",
    prevDay: "前一天",
    nextDay: "後一天",
  },
  addWater: {
    title: "手動加水",
    cupAria: (percent: number) => `水杯水位百分之${percent}`,
    ready: (ml: number) => `準備加入 ${ml} 毫升`,
    prompt: "請選擇或輸入這次喝水量",
    quickLabel: "常用水量",
    inputLabel: "或自行輸入",
    placeholder: "＿＿",
    add: "加入",
  },
  profile: {
    aria: "基本資料",
    title: "基本資料",
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
    title: "夜間靜音",
    enable: "夜間靜音",
    start: "開始時間",
    end: "結束時間",
    savedToast: "已儲存夜間靜音設定",
  },
  about: {
    title: "關於我們",
    description:
      "水啦是放在水瓶下面的智慧底座，搭配手機 App 使用。喝完水把水瓶放回去，它會自動記下喝了多少；太久沒喝水時，會用柔和的燈光提醒。",
    demoTitle: "課程專題示範版",
    demoBody: "這是創業課程的專題作品，畫面中的資料都是示範用的。",
  },
}
