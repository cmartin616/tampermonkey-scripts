// ==UserScript==
// @name         Grocy Hide Product Fields
// @namespace    https://github.com/cmartin616
// @version      1.0.1
// @updateURL    https://raw.githubusercontent.com/cmartin616/tampermonkey-scripts/main/grocy-hide-product-fields/grocy-hide-product-fields.user.js
// @downloadURL  https://raw.githubusercontent.com/cmartin616/tampermonkey-scripts/main/grocy-hide-product-fields/grocy-hide-product-fields.user.js
// @match        https://inventory.elmstservices.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hideFields() {
        const idsToHide = [
            'default_consume_location_id',
            'move_on_open',
            'shopping_location_id_text_input',
            'group-min_stock_amount',
            'cumulate_min_stock_amount_of_sub_products',
            'treat_opened_as_out_of_stock',
            'due-type-bestbefore',
            'group-default_best_before_days',
            'group-default_best_before_days_after_open',
            'group-default_best_before_days_after_freezing',
            'group-default_best_before_days_after_thawing',
            'should_not_be_frozen',
            'qu_id_stock',
            'qu_id_purchase',
            'qu_id_consume',
            'qu_id_price',
            'enable_tare_weight_handling',
            'group-tare_weight',
            'not_check_stock_fulfillment_for_recipes',
            'group-calories',
            'group-quick_consume_amount',
            'group-quick_open_amount',
            'default-purchase-price-type-unspecified',
            'disable_open',
            'hide_on_stock_overview',
            'no_own_stock',
        ];

        let hidCount = 0;
        idsToHide.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            let parent = el;
            while (parent && !parent.classList.contains('form-group')) {
                parent = parent.parentElement;
            }

            if (parent && parent.classList.contains('form-group')) {
                parent.style.setProperty('display', 'none', 'important');
                hidCount++;
            } else {
                el.style.setProperty('display', 'none', 'important');
                hidCount++;
            }
        });
        return hidCount;
    }

    // Watch for the form to appear in the DOM
    const observer = new MutationObserver(() => {
        if (document.getElementById('product-form')) {
            const count = hideFields();
            if (count > 0) {
                observer.disconnect();
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Also try immediately and on load as fallback
    hideFields();
    window.addEventListener('load', () => {
        hideFields();
        setTimeout(hideFields, 500);
        setTimeout(hideFields, 1500);
        setTimeout(hideFields, 3000);
    });
})();
