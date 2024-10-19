async function sprintChallenge5() {
  // Note the async keyword so you can use `await` inside sprintChallenge5
  // :point_down: WORK ONLY BELOW THIS LINE :point_down:
  // :point_down: WORK ONLY BELOW THIS LINE :point_down:
  // :point_down: WORK ONLY BELOW THIS LINE :point_down:
  // :point_down: ==================== TASK 1 START ==================== :point_down:
  // :brain: Use Axios to GET learners and mentors.
  // :exclamation: Use the variables `mentors` and `learners` to store the data.
  // :exclamation: Use the await keyword when using axios.
  let mentors = [];
  let learners = [];
  try {
    const learnersData = await axios.get("http://localhost:3003/api/learners");
    const mentorsList = await axios.get("http://localhost:3003/api/mentors");
    mentors = mentorsList.data;
    learners = learnersData.data;
  } catch (error) {
    console.log(error);
  }
  // - Endpoint A [GET] <http://localhost:3003/api/learners>
  // - Endpoint B [GET] <http://localhost:3003/api/mentors>
  // :point_up_2: ==================== TASK 1 END ====================== :point_up_2:
  // :point_down: ==================== TASK 2 START ==================== :point_down:
  // :brain: Combine learners and mentors.
  // :exclamation: At this point the learner objects only have the mentors' IDs.
  // :exclamation: Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }
  let combinedData = []; // Change to an array
  learners.forEach((learner) => {
    const newLearner = {
      ...learner,
      mentors: learner.mentors.map((id) => {
        let mentor = mentors.find((mentorObject) => id === mentorObject.id);
        return mentor
          ? mentor.firstName + " " + mentor.lastName
          : "Unknown Mentor"; // Handle case if mentor isn't found
      }),
    };
    combinedData.push(newLearner); // Push directly without return
  });
  console.log(combinedData);
  //const found = array1.find((element) => element > 10);
  // :point_up_2: ==================== TASK 2 END ====================== :point_up_2:
  const cardsContainer = document.querySelector(".cards");
  const info = document.querySelector(".info");
  info.textContent = "No learner is selected";
  // :point_down: ==================== TASK 3 START ==================== :point_down:
  for (let learner of combinedData) {
    // looping over each learner object
    // :brain: Flesh out the elements that describe each learner
    // :exclamation: Give the elements below their (initial) classes, textContent and proper nesting.
    // :exclamation: Do not change the variable names, as the code that follows depends on those names.
    // :exclamation: Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // :exclamation: Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // :exclamation: Inspect the mock site closely to understand what the initial texts and classes look like!
    const card = document.createElement("div");
    const heading = document.createElement("h3");
    const email = document.createElement("div");
    const mentorsHeading = document.createElement("h4");
    const mentorsList = document.createElement("ul");
    card.classList.add("card");
    heading.classList.add("learner-name");
    email.classList.add("learner-email");
    mentorsHeading.classList.add("closed");
    mentorsList.classList.add("mentor-list");
    heading.textContent = learner.fullName; // 'fullname' should be 'fullName'
    email.textContent = learner.email;
    mentorsHeading.textContent = "Mentors";
    for (let mentorName of learner.mentors) {
      const mentorItem = document.createElement("li");
      mentorItem.classList.add("mentor-item"); // Corrected 'classList'
      mentorItem.textContent = mentorName;
      mentorsList.appendChild(mentorItem);
    }
    card.appendChild(heading);
    card.appendChild(email);
    card.appendChild(mentorsHeading);
    card.appendChild(mentorsList);
    // :point_up_2: ==================== TASK 3 END ====================== :point_up_2:
    // :point_up_2: WORK ONLY ABOVE THIS LINE :point_up_2:
    // :point_up_2: WORK ONLY ABOVE THIS LINE :point_up_2:
    // :point_up_2: WORK ONLY ABOVE THIS LINE :point_up_2:
    card.appendChild(mentorsList);
    card.dataset.fullName = learner.fullName;
    cardsContainer.appendChild(card);
    card.addEventListener("click", (evt) => {
      const mentorsHeading = card.querySelector("h4");
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading;
      const isCardSelected = card.classList.contains("selected");
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll(".card").forEach((crd) => {
        crd.classList.remove("selected");
        crd.querySelector("h3").textContent = crd.dataset.fullName;
      });
      info.textContent = "No learner is selected";
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add("selected");
          heading.textContent += `, ID ${learner.id}`;
          info.textContent = `The selected learner is ${learner.fullName}`;
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add("selected");
        if (mentorsHeading.classList.contains("open")) {
          mentorsHeading.classList.replace("open", "closed");
        } else {
          mentorsHeading.classList.replace("closed", "open");
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`;
          info.textContent = `The selected learner is ${learner.fullName}`;
        }
      }
    });
  }
  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
}
// :exclamation: DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else sprintChallenge5();







