( function ( $ ) {
	"use strict";
	var items = {
		init: function () {
			this.getItem();
			this.eventHandler();

		},

		eventHandler: function () {
			var itemContainer = $( '#item-cont' );
			$( '#add-item-form' ).on( 'submit', items.getFormInput );
			itemContainer.on( 'click', '.delete-btn', items.deleteItem );
			itemContainer.on( 'click', '.edit-btn', items.appendEditForm );
		},

		/**
		 * Get Items using API request.
		 */
		getItem : function () {
			var request = $.ajax( {
				url: 'http://itemapi.test/api/items'
			} );
			
			request.done( function ( response ) {
				var data = '';
				for ( var i = 0; i < response.length; i++ ) {
					data += '<div class="item-container-' + response[ i ].id + '">'
					data += '<li class="list-group-item"><strong>Item Id: </strong>' + response[ i ].id + '</li>';
					data += '<li class="list-group-item"><strong>Text: </strong>' + response[ i ].text + '</li>';
					data += '<li class="list-group-item"><strong>Body: </strong>' + response[ i ].body + '</li>';
					data += '<li class="list-group-item list-link-cont">' +
						'<a href="#" data-item-id="' + response[ i ].id  + '" class="btn btn-danger edit-btn">Edit</a>' +
						'<a href="#" data-item-id="' + response[ i ].id  + '" class="btn btn-primary delete-btn float-right">Delete</a>' +
						'</li>';
					data += '</div>';
					data += '<hr>';
				}
				$( '#item-cont' ).append( data );
			});
		},

		/**
		 * Gets the add item form input value an calls the addItem() for ajax request.
		 */
		getFormInput: function ( event ) {
			/**
			 * Prevent the default action of form submit and get the input values.
			 */
				event.preventDefault();
				var inputTextVal = $( '#text' ).val(),
					inputBodyVal = $( '#body' ).val();
				items.addItem( inputTextVal, inputBodyVal );
		},

		/**
		 * Add item using API request
		 *
		 * @param {string} inputTextVal
		 * @param {body} inputBodyVal
		 */
		addItem: function ( inputTextVal, inputBodyVal ) {
			var request = $.ajax( {
				method: 'POST',
				url: 'http://itemapi.test/api/items',
				data: {
					text: inputTextVal,
					body: inputBodyVal
				}
			} );

			request.done( function ( response ) {
				console.log( response );
				alert( 'Data Added' );
				items.clearFormFields();
			});
		},

		/**
		 * Sets the form fields values to empty.
		 * We call this function post data submission
		 */
		clearFormFields: function () {
			$( '#text' ).val( '' );
			$( '#body' ).val( '' );
		},

		/**
		 * Delete item with the given id.
		 */
		deleteItem: function ( event ) {
			var id = $( event.target ).attr( 'data-item-id' ),
				itemId = ( id ) ? id : '',
				apiUrl = 'http://itemapi.test/api/items/' + itemId,
				request;

			request = $.ajax( {
				method: 'POST',
				url: apiUrl,
				data: {
					_method: 'DELETE'
				}
			} );

			request.done( function ( response ) {
			});
		},

		/**
		 * Appends edit form when edit button is clicked and calls the editItem() to delete the item with the given id.
		 */
		appendEditForm: function ( event ) {

			// Stop the default action of the link.
			event.preventDefault();
			var form, id, itemId, containerClass, hasForm;
			id = $( event.target ).attr( 'data-item-id' );
			itemId = ( id ) ? id : '';
			containerClass = '.item-container-' + itemId;
			hasForm = ( $( containerClass ).find( 'form' ).hasClass( 'edit-item-form' ) );
			form = '<div class="container">' +
					'<form id="edit-item-form" class="edit-item-form">' +
						'<div class="form-group">' +
							'<label for="edit-text">Text</label>' +
							'<input type="edit-text" class="form-control" id="edit-text">' +
						'</div>' +
						'<div class="form-group">' +
							'<label for="edit-body">Body</label>' +
							'<textarea class="form-control" id="edit-body"></textarea>' +
						'</div>' +
						'<input type="submit" value="Edit Item" class="btn btn-info">' +
					'</form>' +
				'</div>';

			// If the item container does not have the form then add the form.
			if ( ! hasForm ) {
				$( form ).insertBefore( containerClass + ' .list-link-cont' );
				$( '#edit-item-form' ).on( 'submit', function ( event ) {
					event.preventDefault();
					var editTextVal = $( '#edit-text' ).val(),
						editBodyVal = $( '#edit-body' ).val();
					items.editItem( editTextVal, editBodyVal, itemId );
				} );
			}
		},

		/**
		 * Edits an item via ajax api request.
		 */
		editItem: function ( editTextVal, editBodyVal, itemId ) {
			var request,
				apiUrl = 'http://itemapi.test/api/items/' + itemId;
			request = $.ajax( {
				method: 'POST',
				url: apiUrl,
				data: {
					text: editTextVal,
					body: editBodyVal,
					_method: 'PUT'
				}
			} );

			request.done( function ( response ) {
				console.log( response );
				alert( 'Data Edited' );
				$( '.edit-item-form' ).remove();
			});
		}
	};
	items.init();
} )( jQuery );