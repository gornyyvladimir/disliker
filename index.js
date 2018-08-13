const photoLinksRaw = document.querySelectorAll(".photos_row a");
const photoLinks = [...photoLinksRaw];

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

const dislike = async (photoLink) => {
  await click(photoLink, () => document.querySelector("#layer_wrap").style.display == 'block');
  await click('.like.active', element => !element.classList.contains('active'));
  await waitForElement('.recaptcha', true);
  await click('.pv_close_btn', () => document.querySelector("#layer_wrap").style.display == 'none');
};

(async () => {
  for (let i = 0; i < photoLinks.length; i++) {
    await dislike(photoLinks[i]);
  }
})();
