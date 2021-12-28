$(document).ready(function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    var docket = {
            clean : 0
        },
        counter = 1,
        wizard = function(amount) {
            docket.clean = amount;

            docket.tax = parseFloat(docket.clean * 0.24);
            docket.income = parseFloat(docket.clean * 0.20);
            docket.invoice = parseFloat(docket.clean + docket.tax);
            docket.paid = parseFloat(docket.invoice - docket.income);
            docket.final = parseFloat((docket.invoice - docket.income) - docket.tax);

            $.each(elems, function(i, v) {
                let elem = 'amount' + v;

                $('#' + elem).val(docket[v.toLowerCase()].toFixed(2));
            });

            $('#flagTax').text(docket.tax.toFixed(2));
            $('#flagIncome').text(docket.income.toFixed(2));
        },
        elems = [
            'Clean',
            'Income',
            'Tax',
            'Invoice',
            'Paid',
            'Final'
        ];

    $('#amountClean').on('change', function() {
        wizard(parseFloat($(this).val()));
    });

    $('#amountInvoice').on('change', function() {
        wizard(parseFloat($(this).val())/1.24);
    });

    $('#amountPaid').on('change', function() {
        let amount = parseFloat($(this).val());

        wizard((amount + amount/5.2)/1.24);
    });

    $('#amountFinal').on('change', function() {
        wizard(parseFloat($(this).val())*1.25);
    });

    $('#amountsCollect').on('click', function() {
        if (docket.clean > 0) {
            let html = '<div class="row text-right border-bottom">';

            html += '<div class="col col-2 pt-2 pb-2 border-right"><input type="text" class="form-control text-right p-0 border-0 bg-light" style="height: auto !important;" value="' + counter + '" /></div>';

            ++counter;

            $.each(elems, function(i, v) {
                let container = '<div class="col pt-2 pb-2 border-right">',
                    current_total = parseFloat($('.total' + v).text()),
                    record = docket[v.toLowerCase()].toFixed(2).replace('.', ','),
                    new_total = (current_total + docket[v.toLowerCase()]).toFixed(2).replace('.', ',');

                if (i == elems.length - 1) {
                    container = '<div class="col pt-2 pb-2">';
                }

                html += container + record + '€</div>';
                $('.total' + v).text(new_total);
            });

            $('#amountsError').css('display', 'none');
            $('#table').prepend(html + '</div>');
            $('#tablePrint').prop('disabled', false);
        } else {
            $('#amountsError').css('display', 'block');
        }
    });

    $('#tablePrint').on('click', function() {
        window.print();
    });
});
