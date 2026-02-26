# Rose & Reign — Booking Feature Build Plan

Frontend-only implementation using HTML, CSS, and vanilla JavaScript.
Bookings are saved to `localStorage`. No backend required.

---

## Step 1 — Create `booking.html`

Add a new page with the same header/footer as the other pages. Just the shell — no form content yet. Update the "Book Now" nav link on all 4 pages to point to `booking.html`.

**Review (5 min):** Click "Book Now" on any page — lands on the new page. Header/footer look consistent.

---

## Step 2 — Add a service selection step

Show the 5 services as clickable cards (Reign Refresh, Crown & Color, etc.). Selecting one highlights it and stores the choice in a JS variable.

**Review (5 min):** Click a service card — it gets a visual "selected" state. Only one can be active at a time.

---

## Step 3 — Add a date & time slot picker

Below the service cards, show a date input and a grid of available time slots (e.g. 9am–7pm in 1-hour blocks). Clicking a slot highlights it.

**Review (5 min):** Pick a date, pick a time — both get a selected state. Changing the date resets the time selection.

---

## Step 4 — Add the contact info form

Name, email, phone fields. A "Confirm Booking" button. Basic validation — all required fields must be filled before submission.

**Review (5 min):** Leave a field blank — submit is blocked with an inline error message. Fill everything in — button becomes clickable.

---

## Step 5 — Add a confirmation screen

On submit, hide the form and show a summary: "Your booking is confirmed! [Service] on [Date] at [Time]." Save the booking object to `localStorage`.

**Review (5 min):** Complete a full booking — confirmation screen shows correct details. Open DevTools → Application → localStorage and confirm the entry was saved.

---

## Step 6 — Handle the "already booked" case

On page load, check localStorage. If a booking exists, show a "You have an existing booking" banner with a "Cancel booking" link that clears it.

**Review (5 min):** Book once, refresh — banner appears. Click cancel — form reappears. Book a second time — new booking replaces old one.

---

