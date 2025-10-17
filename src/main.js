/* global __CARDS_LAST_MODIFIED__ */
import { fetchCards, renderCardGrid } from './cards.js';
import { createModalController } from './modal.js';

const app = document.getElementById('app');
const modalRoot = document.getElementById('modal-root');
const siteUpdate = document.getElementById('site-update');
const siteYear = document.getElementById('site-year');

if (!app) {
  throw new Error('Missing #app container');
}

if (!modalRoot) {
  throw new Error('Missing #modal-root container');
}

if (siteUpdate) {
  const locale = typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en-US';
  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const lastUpdatedSource = typeof __CARDS_LAST_MODIFIED__ !== 'undefined' ? __CARDS_LAST_MODIFIED__ : null;
  const parsedLastUpdated = typeof lastUpdatedSource === 'string' ? new Date(lastUpdatedSource) : null;
  const resolvedDate = parsedLastUpdated && !Number.isNaN(parsedLastUpdated.getTime())
    ? parsedLastUpdated
    : new Date();

  siteUpdate.textContent = `Last updated ${formatter.format(resolvedDate)}`;
}

if (siteYear) {
  siteYear.textContent = new Date().getFullYear();
}

const modal = createModalController(modalRoot);
modal.init();

const tagFilterSection = document.createElement('section');
tagFilterSection.className = 'tag-filter';
tagFilterSection.setAttribute('aria-label', 'Filter cards by tag');
tagFilterSection.hidden = true;

const tagFilterLabel = document.createElement('span');
tagFilterLabel.className = 'tag-filter__label';
tagFilterLabel.textContent = 'Browse by tag';
tagFilterSection.appendChild(tagFilterLabel);

const tagFilterList = document.createElement('div');
tagFilterList.className = 'tag-filter__list';
tagFilterSection.appendChild(tagFilterList);

const searchForm = document.createElement('form');
searchForm.className = 'toolbar';
searchForm.setAttribute('role', 'search');
searchForm.innerHTML = `
  <label class="toolbar__label" for="search-input">Filter ideas</label>
  <input id="search-input" class="toolbar__input" type="search" name="query" placeholder="Search by title or tag" autocomplete="off" />
`;

const searchInput = searchForm.querySelector('#search-input');
if (!searchInput) {
  throw new Error('Missing search input');
}

const cardsContainer = document.createElement('div');
cardsContainer.className = 'cards';

app.appendChild(tagFilterSection);
app.appendChild(searchForm);
app.appendChild(cardsContainer);

let cachedCards = [];
let activeTag = '';

function cardMatchesQuery(card, needle) {
  if (!needle) {
    return true;
  }

  const detailTokens = Array.isArray(card.details) ? card.details : [card.details];
  const haystack = [card.title, card.summary, ...detailTokens, ...(card.tags ?? [])]
    .filter((value) => typeof value === 'string' && value.trim() !== '')
    .join(' ')
    .toLowerCase();
  return haystack.includes(needle);
}

function updateTagButtonStates() {
  const buttons = tagFilterList.querySelectorAll('button');
  buttons.forEach((button) => {
    const buttonTag = button.dataset.tag ?? '';
    const isActive = activeTag === buttonTag;
    button.classList.toggle('tag-filter__button--active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function renderTagFilters(cards) {
  const uniqueTags = Array.from(
    new Set(
      cards.flatMap((card) => {
        if (!Array.isArray(card.tags)) {
          return [];
        }

        return card.tags
          .map((tag) => (typeof tag === 'string' ? tag.trim() : ''))
          .filter((tag) => tag !== '');
      }),
    ),
  ).sort((first, second) => first.localeCompare(second, undefined, { sensitivity: 'base' }));

  if (uniqueTags.length === 0) {
    tagFilterList.innerHTML = '';
    tagFilterSection.hidden = true;
    activeTag = '';
    return;
  }

  tagFilterList.innerHTML = '';

  uniqueTags.forEach((tag) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tag-filter__button';
    button.textContent = tag;
    button.dataset.tag = tag;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      activeTag = activeTag === tag ? '' : tag;
      updateTagButtonStates();
      applyFilters();
    });
    tagFilterList.appendChild(button);
  });

  tagFilterSection.hidden = false;
  updateTagButtonStates();
}

function applyFilters() {
  const queryValue = typeof searchInput.value === 'string' ? searchInput.value : '';
  const trimmed = queryValue.trim().toLowerCase();
  const tagNeedle = activeTag.trim().toLowerCase();

  const filtered = cachedCards.filter((card) => {
    if (tagNeedle) {
      const hasTag = Array.isArray(card.tags)
        && card.tags.some((tag) => typeof tag === 'string' && tag.toLowerCase() === tagNeedle);
      if (!hasTag) {
        return false;
      }
    }

    if (!trimmed) {
      return true;
    }

    return cardMatchesQuery(card, trimmed);
  });

  renderCardGrid({ container: cardsContainer, cards: filtered, onSelect: (card) => modal.open(card) });
}

searchForm.addEventListener('input', () => {
  applyFilters();
});

fetchCards()
  .then((cards) => {
    cachedCards = cards;
    renderTagFilters(cards);
    applyFilters();
  })
  .catch((error) => {
    cardsContainer.innerHTML = `<p class="error">Failed to load cards: ${String(error)}</p>`;
  });
