/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },
  'get /api/bad': 'BadRequestController.Bad',
  'get /api/errortemp': 'BadRequestController.errorTemp',

  'get /api/countries': 'CountryController.getCountries',
  //GET /api_BP/countries

  'get /api/countries/:name/hotels': 'HotelController.getHotels',
  //GET /api_BP/hotels?country=Angola

  'get /api/hotels/:id': 'HotelController.getHotel',
  //GET /api_BP/hotels/333


  'post /api/countries': 'CountryController.postCountry',
//  POST /api_BP/countries/create?name=Angola&description=bla-bla-bla...

  'post /api/countries/:name/hotels': 'HotelController.postHottel',
//  POST /api_BP/hotels/create?country=Angola&name=new desc

  'put /api/hotels/:id': 'putHottel.updateHotel',
// PUT /api_BP/hotels/98/?name=NewNAE fo hotel&description=new hotel bla bla bla

  'delete /api/hotels/:id': 'HotelController.deleteHotel'
 //DELETE /api_BP/hotels/99

// на рахунок blueprint не впевнений чи то таким способом треба було робити чи якось інакше, ну але в принципі працює =)


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
