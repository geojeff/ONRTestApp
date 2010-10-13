// ==========================================================================
// Project:   ONRTestApp
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals ONRTestApp */

/** @authorspace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
ONRTestApp = SC.Application.create(
  /** @scope ONRTestApp.prototype */ {

  NAMESPACE: 'ONRTestApp',
  VERSION: '0.1.0',

  store: SC.Store.create().from('ONRTestApp.DataSource')
  
//  ALL_ABBREVIATIONS: SC.Query.local(ONRTestApp.ISBN),
//  ALL_FEEDER_OBSERVATIONS: SC.Query.local(ONRTestApp.Version),
//  ALL_BIRDS: SC.Query.local(ONRTestApp.Book),
//  KINGLET: SC.Query.local(ONRTestApp.Book, "author = {gn_ltrs} AND title CONTAINS {ltrs}", { gn_ltrs:"Regulus", ltrs:"Kinglet"}),
//  FINCH: SC.Query.local(ONRTestApp.Book, "author = {gn_ltrs} AND title CONTAINS {ltrs}", { gn_ltrs:"Carpodacus", ltrs:"Finch"})

}) ;
