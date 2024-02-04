function query(rootElement: Document | Element, selector: string) {
  const el = rootElement.querySelector(selector);
  if (!el) throw new Error(`Could not find element with selector: ${selector}`);
  return el;
}

// Create a helper to query 1 or more elements.
// Lazily queries element and errors if not found.
function bulkQuery(rootElement: Element, selectors: Record<string, string>) {
  const elements: Record<string, HTMLElement> = {};
  const memo = new Map<string, HTMLElement>();

  Object.entries(selectors).forEach(([property, selector]) => {
    Object.defineProperty(elements, property, {
      get() {
        if (memo.has(property)) return memo.get(property) as HTMLElement;

        const el = rootElement.querySelector(selector) as HTMLElement;
        if (!el) throw new Error(`Could not find element with selector: ${selector}`);

        memo.set(property, el);
        return el;
      },
      enumerable: true,
    });
  });

  return elements;
}

query.bulk = bulkQuery;

export default query;
