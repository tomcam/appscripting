# Sidebar app with dropdowns to collect a date

## sidebar.html

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> 
<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/themes/cupertino/jquery-ui.css">


<div>
    <!--
    <input type="button" value="Create Report" onclick="google.script.run.doGet()" />
    -->
    <div><label for="from-month" tabindex="1">From:</label></div>
    <select id="from-month" name="from-month" class="watchDropdown">
      <option value="0">January</option>
      <option value="1">February</option>
      <option value="2">March</option>
      <option value="3">April</option>
      <option value="4">May</option>
      <option value="5">June</option>
      <option value="6">July</option>
      <option value="7">August</option>
      <option value="8">September</option>
      <option value="9">October</option>
      <option value="10">November</option>
      <option value="11">December</option>
    </select>
    
    <select id="from-year" name="from-year" class="watchDropdown">
      <option value="2018">2018</option>
      <option value="2019">2019</option>
      <option value="2020">2020</option>
    </select>
    
    <div><label for="to-month" tabindex="2">To:</label></div>
    <select id="to-month" name="to-month" class="watchDropdown">
      <option value="0">January</option>
      <option value="1">February</option>
      <option value="2">March</option>
      <option value="3">April</option>
      <option value="4">May</option>
      <option value="5">June</option>
      <option value="6">July</option>
      <option value="7">August</option>
      <option value="8">September</option>
      <option value="9">October</option>
      <option value="10">November</option>
      <option value="11">December</option>
    </select>
    
    <select id="to-year" name="to-year" class="watchDropdown">
      <option value="2018">2018</option>
      <option value="2019">2019</option>
      <option value="2020">2020</option>
    </select>
    
    <div></div>
    <input type="button" value="OK" onclick="sendFormValueForGs()" />
    <input type="button" value="Close" onclick="google.script.host.close()" />
    <div><label id="info"for="info"></label></div>
    <div><input type="text" id="query" name="query"></div>
</div>

<script>
/**
 * IMPORTANT! This is how to get values from the HTML form to google apps script code.
 * Function's name can be anything.
 */
  function sendFormValueForGs() {
    var filename=document.getElementById("filename").value;
    google.script.run.receiveFormValues(filename);
  }
  
  /* Dynamically display query based on dropdown choice */
  function updateQuery(fromYear, fromMonth, toYear, toMonth) {
    $('#query').val('From ' + fromYear + ',' + fromMonth + ' To ' + toYear + ',' + toMonth );
  }

/**
 * Update a textbox containing the query dynamically.
 */
function getDropdownValues() {
    query = ('year: ' + $('#from-year').val() + 'month: ' + $('#from-month').val())
    // $("label[for='info']").text(query);
    updateQuery($('#from-year').val(), $('#from-month').val(), $('#to-year').val(), $('#to-month').val());
}

/**
 * Called whenever the user navigates the dropdown
 */
$(".watchDropdown").change(function (){
  getDropdownValues();
}); 
  
$(document).ready(function(){
    // Can prefill values here
    $("label[for='info']").text('');
    $("#filename").val('headerAnd3Rows') // headerAnd3Rows, q2q42018TEST2
    $('#query').val('');
    getDropdownValues();
}); 
  
  
  
</script>






