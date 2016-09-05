require(['gitbook', 'jQuery'], function (gitbook, $) {
  init: function() {
    var $toc = $( '#toc' );

    if ( $toc.length > 0 ) {
      if ( mw.user.options.get( 'toc-floated' ) ) {
        $toc.addClass( 'tocFloat' );
      }
      $toc.attr( 'cellspacing', 0 );

      var $mainUl = $( 'ul:first', $toc );
      var $mainList = $( 'li', $toc );

      $mainList.each( function( i ) {
        if ( $( this ).hasClass( 'toclevel-1' ) ) {
          $( this ).css( 'position', 'relative' );
          var $subList = $( 'ul', $( this ) );

          if ( $subList.length > 0 ) {
            if ( $mainUl.length > 0 ) {
              $mainUl.addClass( 'tocUl' );
            }

            var $toggleLink = $( '<span />' ).addClass( 'toggleSymbol' );

            if ( mw.user.options.get( 'toc-expand' ) ) {
              $toggleLink
                .text( '-' )
                .attr( 'title', mw.msg( 'hidetoc' ) );

              $subList.show();
            } else {
              $toggleLink
                .text( '+' )
                .attr( 'title', mw.msg( 'showtoc' ) );

              $subList.hide();
            }
            $toggleLink.click( mw.tocTree.processClickEvent );

            var $toggleSpan = $( '<span />' ).addClass( 'toggleNode' );
            $toggleSpan.append( '[', $toggleLink, ']' );

            $( this ).prepend( $toggleSpan );
          }
        }
      } );
    }

    return true;
  }

	processClickEvent: function ( event ) {
		var $ul = $( 'ul', $( this ).parent().parent() );
		$ul.toggle();

		if ( $ul.is( ':visible' ) ) {
			$( this )
				.text( '-' )
				.attr( 'title', mw.msg( 'hidetoc' ) );
		} else {
			$( this )
				.text( '+' )
				.attr( 'title', mw.msg( 'showtoc' ) );
		}
	}
});
