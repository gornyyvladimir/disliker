const likesRaw = document.querySelectorAll(".like.active");
const likes = [...likesRaw];

const waitFor = condition => new Promise(resolve => {
  const wait = setInterval(() => {
    if (condition()) {
      clearInterval(wait);
      resolve();
    }
  }, 200);
});

const waitForElement = async (selector, waitForHide = false) => {
  await waitFor(() => {
    const element = document.querySelector(selector);
    return (element && !waitForHide) || (!element && waitForHide);
  });

  return document.querySelector(selector);
}

const click = async (selector, condition) => {
  const element = typeof selector === 'string' ? await waitForElement(selector) : selector;
  element.click();
  return waitFor(() => condition(element));
};

const dislike = async (selector) => {
  await click(selector, element => !element.classList.contains('active'));
  await waitForElement('.recaptcha', true);
};

(async () => {
  for (let i = 0; i < likes.length; i++) {
    await dislike(likes[i]);
  }
})();
