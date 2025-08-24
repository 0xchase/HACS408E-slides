---
title: Applied Reverse Engineering
layout: title-with-image
subtitle: Week 1
description: Foundations and principles of HCI
buttonText: Start Week 1
imageText: Week 1
imageCaption: Introduction to HCI
frameGradient: bg-gradient-to-r from-green-500 to-blue-600
imageGradient: bg-gradient-to-br from-green-400 via-blue-500 to-cyan-500
slides:
  - Course Overview
  - Reverse Engineering
  - File Identification
  - Lab 1
  - File Extraction
  - Lab 2
  - Homework
---

<div class="abs-br m-6 text-xl">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="slidev-icon-btn">
    <carbon:edit />
  </button>
</div>

---
currentNav: "Course Overview"
---

# Course Overview

- **Instructors**: Chase Kanipe, Luke Mains
- **Email**: ckanipe@umd.edu, lmains@umd.edu
- **Website**: hacs408e.umd.edu
- **Books**: None required

---
currentNav: "Course Overview"
---

# Assignments

The majority of time in class will be spent on labs. This is an applied course. The weekly homeworks (50% of your grade) will require you to demonstrate mastery of the techniques taught through the labs. In lieu of a midterm exam students will present their reverse engineering efforts against malware samples assigned to each group.

---
currentNav: "Course Overview"
---

# Grading

| Assignment | Weight |
| --- | --- |
| Homework | 50% |
| Quizzes	 | 10% |
| Participation	| 10% |
| Team Presentation	| 10% |
| Final Project	| 20% |
| Total	| 100% |

---
currentNav: "Course Overview"
---

# Policies

- Do not attempt to use what you learn in this class to commit illegal acts.
- You will learn things in this course that you potentially can use to 'steal' intellectual property and exploit commercial software.
- It's not our intent to train a new generation of criminals.
- Use your best judgement, what you choose to do with this knowledge is on you.

---
currentNav: "Course Overview"
---

# Website

HACS408E.umd.edu

discord link here

---
currentNav: "Reverse Engineering"
---

# What is Reverse Engineering?

Reverse engineering is the process of analyzing an existing system to understand it's inner workings. This course will be primarily focused on *software* reversing with 

**Reasons:**

- Vulnerability Analysis
- Malware Analysis
- Interoperability
- ~~Piracy~~
- ~~Intellectual Property Theft~~

---
currentNav: "Reverse Engineering"
layout: image-right
image: /assets/images/marcus-wired.png
---

# Example 1: Malware Analysis

In May of 2017, the WannaCry ransomware had infected an estimated 300,000 computers worldwide, encrypting user files and demanding a ransom payment.

British researcher Marcus Hutchins:

- Reverse engineered the worm's artifacts
- Spotted a hard-coded domain that functioned as a kill switch when registered
- Registered the domain, halting the spread
- Arrested for writing malware in his free time

---
currentNav: "Reverse Engineering"
layout: image-right-2
image1: /assets/images/balloon.png
image2: /assets/images/balloon-fbi.png
---

# Example 2: Counterintelligence

In May of 2017, the WannaCry ransomware had infected an estimated 300,000 computers worldwide, encrypting user files and demanding a ransom payment.

British researcher Marcus Hutchins:

- Reverse engineered the worm's artifacts
- Spotted a hard-coded domain that functioned as a kill switch when registered
- Registered the domain, halting the spread
- Arrested for writing malware in his free time

---
currentNav: "Reverse Engineering"
layout: image-right-2
image1: /assets/images/playstation.png
image2: /assets/images/hotz.png
---

# Example 3: Interoperability

In May of 2017, the WannaCry ransomware had infected an estimated 300,000 computers worldwide, encrypting user files and demanding a ransom payment.

British researcher Marcus Hutchins:

- Reverse engineered the worm's artifacts
- Spotted a hard-coded domain that functioned as a kill switch when registered
- Registered the domain, halting the spread
- Arrested for writing malware in his free time

---
currentNav: "Reverse Engineering"
---

# Ethics

Don't be evil.

---
currentNav: "Reverse Engineering"
---

# Outcomes for this course

Skill tree here.

---
currentNav: "Reverse Engineering"
---

# Outcomes for this class

<SkillTree :data="reverseEngineeringSkills" />

<script setup>
const reverseEngineeringSkills = {
  rootNode: {
    title: "Reverse Engineering Skills",
    icon: "🎯",
    branches: [
      {
        title: "File Analysis",
        icon: "📁",
        subBranches: [
          {
            title: "File Identification",
            icon: "🔍",
            leaves: [
              { title: "Magic Numbers", icon: "🔢" },
              { title: "File Extensions", icon: "📄" },
              { title: "Header Analysis", icon: "📋" }
            ]
          },
          {
            title: "File Signatures",
            icon: "✍️",
            leaves: [
              { title: "Pattern Matching", icon: "🎯" },
              { title: "Database Lookup", icon: "🗄️" }
            ]
          },
          {
            title: "File Extraction",
            icon: "📦",
            leaves: [
              { title: "Binary Blobs", icon: "💾" },
              { title: "Archive Analysis", icon: "🗜️" }
            ]
          }
        ]
      },
      {
        title: "Binary Analysis",
        icon: "⚙️",
        subBranches: [
          {
            title: "Assembly Language",
            icon: "💻",
            leaves: [
              { title: "x86 Assembly", icon: "🖥️" },
              { title: "ARM Assembly", icon: "📱" },
              { title: "MIPS Assembly", icon: "🔧" }
            ]
          },
          {
            title: "Disassembly",
            icon: "🔓",
            leaves: [
              { title: "Control Flow", icon: "🔄" },
              { title: "Data Flow", icon: "📊" }
            ]
          },
          {
            title: "Decompilation",
            icon: "📝",
            leaves: [
              { title: "High-Level Code", icon: "📋" },
              { title: "Function Recovery", icon: "🔍" }
            ]
          }
        ]
      },
      {
        title: "Network Analysis",
        icon: "🌐",
        subBranches: [
          {
            title: "Protocol Analysis",
            icon: "📡",
            leaves: [
              { title: "Traffic Inspection", icon: "👁️" },
              { title: "Packet Analysis", icon: "📦" }
            ]
          },
          {
            title: "Network Forensics",
            icon: "🕵️",
            leaves: [
              { title: "Log Analysis", icon: "📋" },
              { title: "Timeline Analysis", icon: "⏰" }
            ]
          }
        ]
      },
      {
        title: "Malware Analysis",
        icon: "🦠",
        subBranches: [
          {
            title: "Static Analysis",
            icon: "📖",
            leaves: [
              { title: "Code Analysis", icon: "💻" },
              { title: "String Analysis", icon: "🔤" },
              { title: "Import Analysis", icon: "📥" }
            ]
          },
          {
            title: "Dynamic Analysis",
            icon: "🧪",
            leaves: [
              { title: "Sandbox Analysis", icon: "🏗️" },
              { title: "API Monitoring", icon: "📊" },
              { title: "Registry Analysis", icon: "🗃️" }
            ]
          },
          {
            title: "Behavioral Analysis",
            icon: "👁️",
            leaves: [
              { title: "Process Monitoring", icon: "📈" },
              { title: "Network Behavior", icon: "🌐" },
              { title: "File System Changes", icon: "💾" }
            ]
          }
        ]
      },
      {
        title: "Tools & Techniques",
        icon: "🛠️",
        subBranches: [
          {
            title: "Analysis Tools",
            icon: "🔧",
            leaves: [
              { title: "Hex Editors", icon: "🔢" },
              { title: "Disassemblers", icon: "🔓" },
              { title: "Debuggers", icon: "🐛" }
            ]
          },
          {
            title: "Network Tools",
            icon: "📡",
            leaves: [
              { title: "Wireshark", icon: "🦈" },
              { title: "tcpdump", icon: "📊" }
            ]
          },
          {
            title: "Automation",
            icon: "🤖",
            leaves: [
              { title: "Python Scripts", icon: "🐍" },
              { title: "Shell Scripts", icon: "🐚" }
            ]
          }
        ]
      }
    ]
  }
}
</script>

---
currentNav: "File Identification"
---

# File Identification

---
currentNav: "File Identification"
---

## Secondary Slide 1

---
currentNav: "File Identification"
---

## Wikipedia Slide

Here's some text that describes the content.

<Browser 
  url="https://en.wikipedia.org/wiki/List_of_file_signatures" 
  width="100%" 
  height="400px"
/>

---
currentNav: "Lab 1"
---

## Lab 1

This lab is meant to show how to do stuff.

https://hacs408e.umd.edu/schedule/week-01/

<CountdownTimer :destHour="18" :destMinute="15" />

---
currentNav: "File Extraction"
---

# File Extraction

---
currentNav: "File Extraction"
---

## Secondary Slide 1

---
currentNav: "File Extraction"
---

## Hex Extract

Here's some text that describes what to do.

```c [example.bin] {all|6|11|6-10|11|16|11-15|16|22|16-21|22|all}{maxHeight: '400px',lines: true}
00000000: AA BB CC DD EE FF 00 11 22 33 44 55 66 77 88 99  ........"3DUfw..
00000010: 00 11 22 33 44 55 66 77 88 99 AA BB CC DD EE FF  .."3DUfw........
00000020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00001000: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00001010: FF EE DD CC BB AA 99 88 77 66 55 44 33 22 11 00  ........wfUD3"..
00001020: 89 50 4E 47 0D 0A 1A 0A 00 00 00 0D 49 48 44 52  .PNG......IHDR
00002000: 00 00 02 80 00 00 01 E0 08 06 00 00 00 75 71 3C  ..............uq<
00002010: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00002020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00003000: 4C 00 00 00 04 67 41 4D 41 00 00 B1 8F 0B FC 61  L....gAMA......a
00003010: FF D8 FF E0 00 10 4A 46 49 46 00 01 02 01 00 60  ......JFIF.....`
00003020: 00 60 00 00 FF DB 00 43 00 08 06 06 07 06 05 08  .`.....C........
00004000: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00004010: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00004020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00005000: 50 4B 03 04 14 00 06 00 08 00 00 00 21 00 B3 AC  PK..........!...
00005010: 8D 4E 00 00 00 00 00 00 00 00 00 00 08 00 1C 00  .N..............
00005020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00006000: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00006010: 74 65 73 74 2E 74 78 74 55 54 09 00 03 E8 3D 75  test.txtUT....=u
00006020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00007000: 7F 45 4C 46 02 01 01 00 00 00 00 00 00 00 00 00  .ELF............
00007010: 02 00 3E 00 01 00 00 00 78 00 40 00 00 00 00 00  ..>.....x.@.....
00007020: 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  @...............
00008000: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00008010: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
00008020: 07 07 07 09 09 08 0A 0C 14 0D 0C 0B 0B 0C 19 12  ................
```

---
currentNav: "Lab 2"
---

## Lab 2

Instructions for how to complete Lab 2.

<CountdownTimer :destHour="19" :destMinute="40" />

---
currentNav: "Homework"
---

# Homework

Thank you for attending!

<div class="mt-8">
  <div class="text-sm text-gray-400">
    Next: Week 2
  </div>
</div>
