---
title: BarbeQueue — Google UX Design Certificate
date: 2023
project_type: UX design exercise
context: Google UX Design Certificate
status: last updated 04-10-26
tags:
  - ux-design
  - user-research
  - usability-testing
  - interaction-design
  - prototyping
  - ui-ux
---
# BarbeQueue

![[Hero.png]]

BarbeQueue *(Pun not intended) was a mobile application concept intended to make ordering from BBQ restaurants more convenient. 

The concept combined two use cases:
- **Dine-in / pre-queuing** for customers visiting a restaurant
- **Catering** for customers ordering food from the same restaurant

This course-based project was worked on soley by me within a period of 2 months, which saw the iteration progress through research planning, usability testing, synthesis, and the early design of the solution.

---

# 01 — The challenge

The existing ordering experience at barbecue restaurants came with several points of friction. Customers could face:
1. **Long queues during peak hours**, with limited ability to plan their orders ahead of time. Specifically to barbecuing, meats often had a high preparation and cooking time which led to longer turnover time on-premise.
2. Where online ordering was available, many BBQ restaurants relied on **individual in-house apps**, making it inconvenient for customers who wanted to discover, compare, or order from different restaurants in one place.

BarbeQueue therefore aimed to bring these steps together into a more seamless ordering experience. The User Experience problem I focused on was thus:

> **Could the ordering journey be made clear and quick enough that customers could find a restaurant that they want, build an order, and check out, all from the same app?**

---

# 02 — Research

## Planning the study

I created a research plan around the main tasks a customer would need to complete. Participants would work through the prototype and then complete a questionnaire about their experience. The plan covered restaurant selection, ordering, checkout, and open-ended feedback.

The completed research presentation grouped the study around four questions:

1. What would users understand from **“Catering and Dine-In”**?
2. Could they find a suitable restaurant?
3. Could they order and customise their order?
4. Could they complete checkout and input their payment options?

![[UserStudyResearchPlan.png]]

---
## Paper Storyboarding

Concurrently, I started mapping out the possible to-be user experience by sketching out the process of a user going to order from a BBQ restaura![[LofiPrototypeScreens.png]]nt.

### The Big Picture:  "Jeff", our user queuing 
![[Storyboard2.png]]


### Close-up: "Jeff", our user on his phone
![[Storyboard1.png]]

---
# 03 — Testing

## Putting the prototype in front of people

These led to the creation of the first wireframes. I tested the low-fidelity BarbeQueue prototype through a remote usability study, where users were sent links to a [wireframe walkthrough](https://www.figma.com/proto/ZWlw38KEgVMGpagVrjnA2n/Course-3-Week-3?type=design&node-id=106-367&t=r6MTjZIvF4FuMuIt-1&scaling=scale-down&page-id=0%3A1&starting-point-node-id=106%3A367) designed on Figma. Rather than only asking participants whether they liked the interface, I gave them tasks to complete and looked at what they did when the interface stopped making sense.

![[LofiPrototypeFlow.png]]
 
 ![[LofiPrototypeScreens.png]]
---

## Insights from Participants

![[ResearchPlan.png]]
- Sample Participant Response

The usability sessions exposed problems that were difficult to see from the prototype alone.

One participant did not immediately understand what the **Catering** and **Dine-In** choices meant:

> “I don't think i would know what these 2 labels meant, if I dont really know the context of the app.”

![[ParticipantsInsights1.png]]

The ordering flow revealed another issue. After selecting a food item, the participant could not easily return to add more menu options:

> “This is annoying, I'm not here just to order 1 satay only.”

![[WireframeParticipantInsight2.png]]

## Overall Theme of Responses

After the usability study, I consolidated the observations into three recurring themes:

### A - People want to order quickly

**5 out of 7 participants** wanted to order from their chosen restaurant in under five minutes. **4 out of 7** also expressed a desire to favourite their go-to restaurants.

One participant described the problem directly:

> “I like the profile feature, but it’s strange that there’s no way to store my order so I can order it again next time.”

The finding suggested that returning customers should not have to repeat the same restaurant-discovery process every time they wanted to order.

### B - People want more customisation

**4 out of 7 participants** wanted the ability to order more than one menu option. **3 of those participants** also wanted an option to save items into their cart. 

This connected directly with the observed difficulty during testing: the prototype made it harder than expected to build a multi-item order.

### C - People want payment-on-delivery

**6 out of 7 participants** wanted an option to pay cash on delivery. The finding suggested that the checkout experience should not assume that every customer will use an online payment method.


---

# 04 — Findings to Design Requirements

The research became more useful once I translated each theme into something the product could actually respond to.

| Research finding                           | What the design needed to support                  |
| ------------------------------------------ | -------------------------------------------------- |
| Users wanted to order quickly              | A faster path back to favourite restaurants        |
| Users wanted to save / revisit restaurants | A **Save Restaurant** or favourite function        |
| Users wanted more than one menu option     | An **updatable cart** that supports multiple items |
| Users wanted greater ordering flexibility  | Clearer item selection and customisation           |
| Most participants wanted cash on delivery  | A **cash-on-delivery** option at checkout          |

## Turning research into the next version

At this stage, the project shifted from asking **“What is confusing?”** to **“What should the next version do differently?”**

The research did not point toward adding features for their own sake. Instead, it highlighted three parts of the journey that needed to change.

### A) Saved Restaurants

A customer who already knows where they want to order from should not have to search for the same restaurant again.

**Design direction:** Introduce a way to save favourite restaurants and make them easier to access from the profile, thus resulting in faster time to order.

![[RevisionSavedRestaurants.png]]
### B) Let customers build an actual order
The original prototype made the ordering flow feel closer to selecting one item than building a meal.

**Design direction:** Introduce an updatable cart where customers can add multiple items and review their order before checkout.

![[RevisionBuildingOrder.png]]
### C) Make payment choices more flexible

The research showed a strong preference for cash on delivery.

**Design direction:** Make cash payment an explicit checkout option rather than assuming online payment is the only route.

![[RevisionCheckout.png]]

---

# 05 — Takeaways

![[KeyScreens.png]]A key gap in the project was that the course stopped at one round of research and one revision, so I never got to re-test the redesigned flow.

However, I took away a lot in seeing how UX problems connected. A confusing label, a hard-to-find button and no way to add a second item looked like three separate issues yet they all came from the same core issue: the app didn't follow the order people expected. Instead of simply making individual screens look clearer, I learnt to think about the whole journey from the user's perspective.

This project was my first touchpoint moving into UI UX design during my Information Systems curricular, and it taught me the value of **designing around real user needs rather than assumptions**. More importantly, it gave me my first opportunity to connect research, usability testing, and design decisions into one full process.