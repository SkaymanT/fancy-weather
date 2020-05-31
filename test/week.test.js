import Search from '../src/app/search-container/search';

describe('Search test', () => {
  function searchHandler(t) {
    let text = t;
    expect(searchContainer.querySelector('.search-input').value).toEqual(text);
  }

  let max = 2;
  let search = new Search(searchHandler);
  let searchContainer = search.render();

  it('Click on Clear should return input ""', () => {
    for (let i = 0; i < max; ++i) {
      let inputElement = searchContainer.querySelector('.search-input');
      inputElement.value = 'Something';
      searchContainer.querySelector('.search-clear').click();
      expect(inputElement.value).toEqual('');
    }
  });

  it('Click on Keyboard should return open keyboard and close keyboard', () => {
    for (let i = 0; i < max; ++i) {
      searchContainer.querySelector('.search-tia').click();
      let keyboard = search.openKeyboard();
      expect(searchContainer.querySelector('.virtual-keyboard')).toEqual(keyboard);

      searchContainer.querySelector('.search-tia').click();
      expect(searchContainer.querySelector('.virtual-keyboard')).toEqual(null);
    }
  });

  it('Click on Search should close virtualKeyboard return input text', () => {
    for (let i = 0; i < max; ++i) {
      let inputElement = searchContainer.querySelector('.search-input');
      inputElement.value = 'Something';
      searchContainer.querySelector('.search-tia').click();
      let keyboard = search.openKeyboard();
      expect(searchContainer.querySelector('.virtual-keyboard')).toEqual(keyboard);
      searchContainer.querySelector('.search-btn').click();
      expect(searchContainer.querySelector('.virtual-keyboard')).toEqual(null);

    }
  });

  it('Click on Enter on virtualKeyboard should close virtualKeyboard and return input text', () => {
    for (let i = 0; i < max; ++i) {
      let inputElement = searchContainer.querySelector('.search-input');
      inputElement.value = 'Something';
      searchContainer.querySelector('.search-tia').click();
      let keyboard = search.openKeyboard();
      expect(searchContainer.querySelector('.virtual-keyboard')).toEqual(keyboard);
      searchContainer.querySelector('span.key[datacode="Enter"]').click();
      expect(searchContainer.querySelector('.virtual-keyboard')).toEqual(null);
    }
  });

  it('Click on Enter on enter should close virtualKeyboard and return input text', () => {
    for (let i = 0; i < max; ++i) {
      let inputElement = searchContainer.querySelector('.search-input');
      inputElement.value = 'Something';
      searchContainer.querySelector('.search-tia').click();
      let keyboard = search.openKeyboard();
      expect(searchContainer.querySelector('.virtual-keyboard')).toEqual(keyboard);
      let event = new Event('keydown');
      event.keyCode = 13;
      search.handlerClickKeyboard(event);
      expect(searchContainer.querySelector('.virtual-keyboard')).toEqual(null);
    }
  });
});