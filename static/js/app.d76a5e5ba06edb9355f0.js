webpackJsonp([1,2],{135:function(t,s,e){e(86);var r=e(9)(e(53),e(140),"data-v-42d4178b",null);t.exports=r.exports},136:function(t,s,e){e(85);var r=e(9)(e(54),e(139),"data-v-11dc4333",null);t.exports=r.exports},137:function(t,s,e){e(84);var r=e(9)(e(55),e(138),"data-v-079bc8cf",null);t.exports=r.exports},138:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],attrs:{type:"text",placeholder:"Artist's name",autofocus:"",tabindex:"1"},domProps:{value:t._s(t.query)},on:{input:[function(s){s.target.composing||(t.query=s.target.value)},t.search]}})},staticRenderFns:[]}},139:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return t.showComponent?e("div",{staticClass:"artists-list bordered"},[t.showError?e("div",[t._v(t._s(t.showError))]):t.showNoResultsMessage?e("div",{staticClass:"nothing-message"},[t._v("Nothing found")]):e("div",{staticClass:"list-wrapper"},[e("ul",t._l(t.artists.items,function(s){return e("li",{attrs:{tabindex:"1"},on:{click:function(e){t.chooseArtist(s)},keyup:function(e){t._k(e.keyCode,"enter",13)||t.chooseArtist(s)}}},[t._v("\n        "+t._s(s.name)+"\n      ")])})),t._v(" "),e("div",{staticClass:"pagination"},[t.artists.previous?e("button",{staticClass:"show-previous-button",on:{click:t.showPrevious}},[e("i",{staticClass:"fa fa-arrow-left"})]):t._e(),t._v(" "),t.artists.next?e("button",{staticClass:"show-next-button",on:{click:t.showNext}},[e("i",{staticClass:"fa fa-arrow-right"})]):t._e()])])]):t._e()},staticRenderFns:[]}},140:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return t.showComponent?e("carousel-3d",{attrs:{width:300,height:300}},t._l(t.albums.items,function(t,s){return e("slide",{attrs:{index:s}},[e("img",{attrs:{src:t.images[0].url}})])})):t._e()},staticRenderFns:[]}},141:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"search-wrapper",class:t.searchWraperClass},[e("search"),t._v(" "),e("artists-list")],1),t._v(" "),e("albums-carousel")],1)},staticRenderFns:[]}},143:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=e(17),i=e.n(r),n=e(31),a=e(32),o=e.n(a);new i.a({el:"#app",store:n.a,template:"<App />",components:{App:o.a}})},31:function(t,s,e){"use strict";var r=e(1),i=e.n(r),n=e(17),a=e.n(n),o=e(2),u=e.n(o),c=e(33),l=e.n(c),m=e(51);e.d(s,"a",function(){return p}),a.a.use(u.a);var f={fetching:!1,error:null,items:null,limit:10},h={fetching:!1,error:null,items:null},p=new u.a.Store({strict:!1,state:{artists:f,artist:null,albums:h},getters:{artists:function(t){return t.artists},artist:function(t){return t.artist},albums:function(t){return t.albums}},mutations:{saveArtists:function(t,s){t.artists=i()({},t.artists,s)},clearArtists:function(t){t.artists=f},saveAlbums:function(t,s){t.albums=i()({},t.albums,s)},clearAlbums:function(t){t.albums=h},artistsError:function(t,s){t.artists.error=s},albumsError:function(t,s){t.albums.error=s},artistsFetching:function(t){t.artists.fetching=!0},artistsFetched:function(t){t.artists.fetching=!1},albumsFetching:function(t){t.albums.fetching=!0},albumsFetched:function(t){t.albums.fetching=!1},chooseArtist:function(t,s){t.artist=s},clearArtist:function(t){t.artist=null}},actions:{getArtists:function(t,s){if(t.state.artist&&t.commit("clearArtist"),s){var r=t.state.artists,i=r.limit,n=r.error;n&&t.commit("artistsError",null),t.commit("artistsFetching"),l.a.get("https://api.spotify.com/v1/search?q="+s+"&type=artist&limit="+i).then(function(s){t.state.albums.items&&t.commit("clearAlbums"),t.commit("artistsFetched"),t.commit("saveArtists",s.data.artists)}).catch(function(s){t.commit("artistsFetched"),t.commit("artistsError",e.i(m.a)(s))})}else t.commit("clearArtists")},showPrevious:function(t){var s=t.state.artists.previous;t.dispatch("sendRequest",s)},showNext:function(t){var s=t.state.artists.next;t.dispatch("sendRequest",s)},chooseArtist:function(t,s){t.dispatch("getAlbums",s),t.commit("chooseArtist",s)},getAlbums:function(t,s){t.commit("albumsFetching"),l.a.get("https://api.spotify.com/v1/artists/"+s.id+"/albums?album_type=album&market=US&limit=50").then(function(s){t.state.artists.items&&t.commit("clearArtists"),t.commit("albumsFetched"),t.commit("saveAlbums",s.data)}).catch(function(s){t.commit("albumsFetched"),t.commit("albumsError",e.i(m.a)(s))})}}})},32:function(t,s,e){e(87);var r=e(9)(e(52),e(141),null,null);t.exports=r.exports},51:function(t,s,e){"use strict";e.d(s,"a",function(){return r});var r=function(t){return t.response?t.response.status+" "+t.response.statusText+": "+t.response.data.error.message:"Error: "+t.message}},52:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=e(1),i=e.n(r),n=e(2),a=(e.n(n),e(137)),o=e.n(a),u=e(136),c=e.n(u),l=e(135),m=e.n(l);s.default={name:"app",components:{Search:o.a,ArtistsList:c.a,AlbumsCarousel:m.a},computed:i()({},e.i(n.mapGetters)(["artists","albums"]),{searchWraperClass:function(){return this.artists.items||this.albums.items?"top":"center"}})}},53:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=e(1),i=e.n(r),n=e(134),a=(e.n(n),e(2));e.n(a);s.default={name:"albums-carousel",components:{Carousel3d:n.Carousel3d,Slide:n.Slide},computed:i()({},e.i(a.mapGetters)(["albums"]),{showComponent:function(){var t=this.albums,s=t.error,e=t.items;return s||e}})}},54:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=e(1),i=e.n(r),n=e(2);e.n(n);s.default={name:"artists-list",computed:i()({},e.i(n.mapGetters)(["artists"]),{showComponent:function(){var t=this.artists,s=t.error,e=t.items;return s||e},showError:function(){return this.artists.error},showNoResultsMessage:function(){return this.artists.items&&!this.artists.items.length}}),methods:i()({},e.i(n.mapActions)(["chooseArtist","showPrevious","showNext"]))}},55:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=e(1),i=e.n(r),n=e(126),a=e.n(n),o=e(124),u=e.n(o),c=e(2);e.n(c);s.default={name:"search",data:function(){return{query:""}},computed:i()({},e.i(c.mapGetters)(["artist"])),methods:i()({},e.i(c.mapActions)(["getArtists"]),{search:u()(function(){this.getArtists(this.query)},300)}),watch:{artist:function(t){console.log("artist",t),this.query=a()(t,"name","")}}}},84:function(t,s){},85:function(t,s){},86:function(t,s){},87:function(t,s){}},[143]);
//# sourceMappingURL=app.d76a5e5ba06edb9355f0.js.map