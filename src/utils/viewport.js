const ViewportHelper = {
  /**
   * Check is window size matches tablet breakpoint.
   *
   * @method isTablet
   * @public
   */
  isTablet() {
    return window.matchMedia('(min-width: 700px)').matches;
  },

  /**
   * Check is window size matches large desktop breakpoint.
   *
   * @method isLargeDesktop
   * @public
   */
  isLargeDesktop() {
    return window.matchMedia('(min-width: 920px)').matches;
  },

  /**
   * Check is window size matches mobile.
   *
   * @method isMobile
   * @public
   */
  isMobile() {
    return window.matchMedia('(max-width: 699px)').matches;
  },

  /**
   * Check is window size matchesextra large.
   *
   * @method isMobile
   * @public
   */
  isExtraLarge() {
    return window.matchMedia('(min-width: 1500px)').matches;
  },

  matchesViewport(abbreviation) {
    switch(abbreviation.toLowerCase()) {
    case 'sm':
      return this.isMobile();
    case 'md':
      return this.isTablet();
    case 'lg':
      return this.isLargeDesktop();
    case 'xl':
      return this.isExtraLarge();
    default:
      return false;
    }
  },

  /**
   * Return abbreviation for screen size. Order matter in the swtich statement.
   */
  getViewportAbbreviation() {
    if (this.isMobile()) {
      return 'sm';
    }
    else if(this.isExtraLarge()) {
      return 'xl';
    }
    else if(this.isLargeDesktop()) {
      return 'lg';
    }
    else if(this.isTablet()) {
      return 'md';
    }
  },
};

export const viewports = ['sm', 'md', 'lg', 'xl'];

export default ViewportHelper;
