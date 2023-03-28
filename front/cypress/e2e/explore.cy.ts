describe('Explore', () => {

  describe('Explore page redirection', () => {
    // Retries to avoid fail on CI
    it('should redirect to / when query parameters are missing', {
      retries: {
        runMode: 1,
        openMode: 1
      }
    }, () => {
      cy.visit('/explore/Nantes?start=2020-01-01&end=2020-01-01');
      cy.location('pathname').should('eq', '/');
    });
  });

  describe('Explore page visit', () => {
    beforeEach(() => {
      cy.visit('/explore/Nantes?start=2020-01-01&end=2020-01-02&lat=47.218371&lng=-1.553621');
    });

    describe('Init', () => {
      it('should stay on /explore when query parameters are fulfilled', () => {
        cy.location('pathname').should('eq', '/explore/Nantes');
      });

      it('should have containers', () => {
        cy.get('app-multiple-search-bars[search-bar]').should('exist');
        cy.get('app-map-filters[map-filters]').should('exist');
        cy.get('app-map[map]').should('exist');
        cy.get('app-map[map] google-map').should('exist')
        cy.get('app-map-travel-mode-selection[map-travel-mode-selection]').should('not.exist');
      });

      it('should input filled with query params value', () => {
        cy.get('app-multiple-search-bars[search-bar] app-search-input[search-bar-input]').find('input').should('have.value', 'Nantes');
        cy.get('app-map-filters[map-filters] app-date-range[filter-date-range] [date-range-input-start]').should('have.value', '1/1/2020');
        cy.get('app-map-filters[map-filters] app-date-range[filter-date-range] [date-range-input-end]').should('have.value', '1/2/2020');
        cy.get('a[href^="https://maps.google.com/maps?ll=47.218371,-1.553621"]').should('exist');
      });
    });

    describe('Search bars', () => {
      it("should add 'Paris' in search bar when searching 'Par'", () => {
        cy.intercept('GET', '/api/locations/suggestion/Par', {fixture: '../fixtures/explore/200_search-bar_suggestion', statusCode: 200}).as('200_search-bar_suggestion');
        cy.get('app-multiple-search-bars[search-bar] app-search-input[search-bar-input]').find('button[search-input-suffix]').click();
        cy.get('app-multiple-search-bars[search-bar] app-search-input[search-bar-input]').find('input').clear().type('Par');
        cy.wait('@200_search-bar_suggestion').its('response.statusCode').should('eq', 200);
        cy.get('mat-option').first().click();
        cy.get('app-multiple-search-bars[search-bar] app-search-input[search-bar-input] input[search-input]').should('have.value', 'Paris');
      });

      it('should add then remove a search bar', () => {
        cy.get('app-multiple-search-bars[search-bar] app-search-input[search-bar-input]').should('have.length', 1);
        cy.get('app-multiple-search-bars[search-bar] app-simple-icon-button[search-bar-add]').find('button').click();
        cy.get('app-multiple-search-bars[search-bar] app-search-input[search-bar-input]').should('have.length', 2);
        cy.get('app-multiple-search-bars[search-bar] app-simple-icon-button[search-bar-remove]').find('button').then(
          (buttons) => {
            cy.wrap(buttons[1]).click();
          }
        );
        cy.get('app-multiple-search-bars[search-bar] app-search-input[search-bar-input]').should('have.length', 1);
      })

      it('should have start date already mentionned', () => {
        cy.get('app-multiple-search-bars[search-bar] app-search-input[search-bar-input]').should('have.length', 1);
        cy.get('app-multiple-search-bars[search-bar] app-simple-icon-button[search-bar-add]').find('button').click();
        cy.get('app-multiple-search-bars[search-bar] app-search-input[search-bar-input]').should('have.length', 2);
        cy.get('app-map-filters[map-filters] app-date-range[filter-date-range] [date-range-input-start]').should('have.value', '1/2/2020');
      });

      it('should switch to itinerary view', () => {
        cy.get('app-map-travel-mode-selection[map-travel-mode-selection]').should('not.exist');
        cy.intercept('GET', '/api/locations/suggestion/Nan', {fixture: '../fixtures/explore/200_search-bar_suggestion', statusCode: 200}).as('200_search-bar_suggestion');

        cy.get('app-multiple-search-bars[search-bar] app-simple-icon-button[search-bar-add]').find('button').click();
        cy.get('app-multiple-search-bars[search-bar] app-search-input[search-bar-input]').find('input').last().clear({ force: true }).type('Nan', { force: true });
        cy.get('mat-option').first().click();
        cy.get('body').click({ force: true })

        let itineraryButton = cy.get('app-multiple-search-bars[search-bar] app-simple-icon-button[search-bar-travel-mode]').find('button').first();

        itineraryButton.click({ force: true });
        cy.get('app-map-travel-mode-selection[map-travel-mode-selection]').should('exist');

        cy.get('app-multiple-search-bars[search-bar] app-simple-icon-button[search-bar-travel-mode]').find('button mat-icon').first().should('have.text', 'directions_car');

        cy.get('app-map-travel-mode-selection[map-travel-mode-selection] app-simple-icon-button[map-travel-mode-button]').find('button').then(
          (icons) => {
            cy.wrap(icons[1]).click({ force: true });
          }
        );

        cy.get('app-multiple-search-bars[search-bar] app-simple-icon-button[search-bar-travel-mode]').find('button mat-icon').first().should('have.text', 'directions_walk');
      });
    });
  });
});
