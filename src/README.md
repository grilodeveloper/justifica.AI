# Corporate Excuse Generator

A professional mobile app for generating creative and absurd (but professional-sounding) excuses for missing work, being late, or leaving early.

## 🎯 Purpose

Help professionals quickly generate credible excuses that sound serious and corporate, even when the situations are highly improbable or absurd.

## 👥 Target Users

- Office workers
- Remote workers
- Corporate professionals under time pressure

## 🎨 Design Philosophy

**Tone & Style:**
- Serious, corporate language applied to absurd situations
- Subtle humor (not cartoonish)
- Clean, modern, minimalist UI
- Light irony, not childish
- Neutral colors, professional look

**UX Principles:**
- Complete flow in under 10 seconds
- Clear hierarchy and large tap targets
- Professional copy throughout

## 📱 Screens

### 1. Landing Screen
- App name and tagline: "Professional excuses. Generated in seconds."
- Primary CTA: "Generate excuse now"
- Secondary CTA: "Emergency excuse (1 tap)"
- Optional history button (when excuses are saved)

### 2. Context Selection
- Three situation options:
  - **Full Day Absence** - Cannot attend work today
  - **Late Arrival** - Will arrive later than scheduled
  - **Leaving Early** - Need to leave before end of day
- Absurdity level slider (1-5):
  - 1 – Almost normal
  - 2 – Slightly unusual
  - 3 – Strange but acceptable
  - 4 – Highly improbable
  - 5 – Completely absurd, said seriously

### 3. Excuse Generation
- Generated excuse displayed in a clean card
- Metadata badges (context type, absurdity level)
- Actions:
  - Copy to clipboard
  - Share (WhatsApp / Email)
  - Regenerate new excuse
  - Save to history
- Pro tips for maximum credibility

### 4. Emergency Mode
- One-tap excuse generation
- No configuration needed
- Random context and absurdity level (2-4)
- Emphasis on speed and urgency
- Microcopy: "No time to think. We did it for you."
- Quick copy and share actions

### 5. History / Saved Excuses
- List of previously saved excuses
- Context tags (Absence / Late / Early exit)
- Timestamp ("2h ago", "Yesterday", etc.)
- Actions per excuse:
  - Read full / Show less
  - Copy
  - Delete

## 🎭 Excuse Examples

### Absence - Level 3 (Strange but acceptable)
> "Morning all. I'm unable to come in today due to a gas leak in my neighborhood that has resulted in a mandatory evacuation. The utility company estimates 6-8 hours for repairs and safety clearance. I have my laptop and will work from the designated community center with WiFi access."

### Late Arrival - Level 5 (Completely absurd)
> "Good morning team. I'm experiencing a significant delay and expect to arrive approximately 2.5 hours late. At 7:20 AM, a construction crane operating near my building experienced a hydraulic failure, leaving its boom suspended directly above the pedestrian sidewalk and street parking. The police have established a safety perimeter that includes my vehicle and the only pedestrian exit from my building."

### Leaving Early - Level 4 (Highly improbable)
> "Hi everyone, I need to leave at 1 PM today. My homeowner's insurance company has scheduled an emergency property inspection following a neighbor's report of potential water damage affecting multiple units. My presence is mandatory for the adjuster's assessment, and they've allocated a 2-4 PM window."

## 🔧 Technical Features

- **Local Storage**: Saves favorite excuses for reuse
- **Toast Notifications**: Clear user feedback
- **Responsive Design**: Optimized for mobile
- **Copy to Clipboard**: One-tap copying
- **Native Share**: WhatsApp, Email, etc. (with fallback)
- **Fast Generation**: Instant excuse creation

## 🎨 Design System

**Colors:**
- Primary: `#1a1a1a` (Corporate black)
- Secondary: `#4a4a4a` (Dark gray)
- Background: `#fafafa` (Light gray)
- Card: `#ffffff` (White)
- Border: `#e5e5e5` (Light border)
- Text: `#171717` (Almost black)
- Text Secondary: `#737373` (Medium gray)

**Typography:**
- System fonts for native feel
- Clean, professional hierarchy
- Letter-spacing for premium feel

**Components:**
- Large tap targets (minimum 44px)
- Rounded corners (8-12px)
- Subtle shadows
- Smooth transitions

## 📝 Writing Principles

1. **Formal corporate language** - Always professional tone
2. **Specific details** - Times, numbers, technical terms
3. **Apparent authority** - References to "officials", "technicians", "policies"
4. **Plausible procedures** - Sounds like real bureaucracy
5. **Confident delivery** - Never apologize excessively
6. **Inevitable framing** - Present as circumstances beyond control

## ⚖️ Disclaimer

For entertainment purposes only. Use responsibly.

---

**Built with:** React, TypeScript, Tailwind CSS, Radix UI
