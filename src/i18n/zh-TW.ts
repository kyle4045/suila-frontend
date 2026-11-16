// Every piece of text the app shows in 繁體中文, including aria labels,
// mock names, dates, times and units. Components never contain text.

const pad2 = (value: number) => String(value).padStart(2, "0")

// shortcut: anything not from today is labelled 昨天; the mock data only
// covers two days. Needs real dates once older items are shown.
const dayTime = (date: Date, isToday: boolean) => {
  const hour = date.getHours()
  const period = hour < 12 ? "上午" : hour === 12 ? "中午" : "下午"
  const clock = `${period} ${hour % 12 || 12}:${pad2(date.getMinutes())}`
  return isToday ? clock : `昨天 ${clock}`
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
    listSeparator: "、",
    mlShort: "ml",
    dayTime,
    speechLang: "zh-TW",
  },
  home: {
    aria: "飲水紀錄",
    statusOk: "一切正常",
    openCalendar: "開啟日曆",
    todayWater: "今天喝水量",
    ringAria: (percent: number) =>
      `今天喝水目標已完成百分之${percent}，點擊額外補水`,
    percent: (percent: number) => `${percent}%`,
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
    unsaved: "還沒有儲存，要離開嗎？",
    leave: "離開不儲存",
    stay: "繼續修改",
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
    nightMute: "夜間靜音",
    about: "關於我們",
    proTitle: "升級 Pro",
    proSubtitle: "解鎖習慣分析、連結更多家人",
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
    aria: "喝水提醒日曆",
    title: "日曆",
    year: (year: number) => `${year} 年`,
    month: (month: number) => `${month} 月`,
    selectMonth: "選擇月份",
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
    cupAria: (percent: number) => `水杯水位百分之${percent}`,
    ready: (ml: number) => `準備加入 ${ml} ml`,
    prompt: "請輸入這次喝水量",
    placeholder: "＿＿",
    inputAria: "額外補水量",
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
