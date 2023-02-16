jQuery(document).ready(function(){
    forms();
    sidebar();
    tab();
    userInfo();
    accord();
    openAddSide();
    editableField();
    // deleteOption();
    importOption();
    viewOption();
    editProfile();
    changepassword();
    notifye();
    logins();
    tourtabContent();
    
    //myFunction();
});
function openAddSide(){
    // $('.openRSide').on('click', function(){
    //     $('.addFromForAll').addClass('addFromForAllNew');
    // });
    $('body').on('click','.openRSide',function(){
        $('.addFromForAll').addClass('addFromForAllNew');
    });
    $('body').on('click','.openRSideManage',function(){
        $('.addFromForManageAll').addClass('addFromForManageAllNew');
    });
    $('body').on('click','.openGAManage',function(){
        $('.GAForm').addClass('addFromForAllNew');
    });
    $('body').on('click','.openPixelManage',function(){
        $('.PixelForm').addClass('addFromForAllNew');
    });
    
    $('.btnCLOSE').on('click', function(){
        $('.addFromForAll').removeClass('addFromForAllNew');
        $('.addFromForManageAll').removeClass('addFromForManageAllNew');
        $('.GAForm').removeClass('addFromForAllNew');
        $('.PixelForm').removeClass('addFromForAllNew');
        //edit
        $('.addFromForManageAllEdit').removeClass('addFromForManageAllEditNew');
    });
}
function sidebar(){
    // $('.toggleBtn').on('click', function(){
    //     $('.sidebar').toggleClass('sidebarNew');
    //     $('.mainContent').toggleClass('mainContentNew');
    //     $('.userheader').toggleClass('userheaderNew');
    //     $('.breadcum').toggleClass('breadcumNew');
    // });

    $('.sidebarNavigation').addClass('sidebarNavigationNew');

    $('.toggleBtn').on('click', function(){
        $('.sidebarNavigation').toggleClass('sidebarNavigationNew');
        $('.submenu').removeClass("menu-open"); 
        $('.sidebar').toggleClass('sidebarNew');
        $('.sidebar').toggleClass('sidebarNewipad');
        $('.mainContent').toggleClass('mainContentNew');
        $('.userheader').toggleClass('userheaderNew');
        $('.breadcum').toggleClass('breadcumNew');
        $('.submenu > a').removeClass('submenuactive');
        $('.submenu > ul').slideUp();
    });
    $('.submenu > a').on('click', function(){
        $('.submenu > a').not($(this)).removeClass('submenuactive');
        $(this).toggleClass("submenuactive");

        $('.submenu > ul').not($(this).next('.submenu > ul')).slideUp('slow');
        $(this).next('.submenu > ul').slideToggle('slow');
    });
    $('.submenu').on('click', function(){
        $('.submenu').not($(this)).removeClass("menu-open");        
        $(this).toggleClass("menu-open", 'slow');   
    });
}
function tab(){
    $('.btnTab a').click(function(){
        var tab_id = $(this).attr('data-tab');
        $('.btnTab a').removeClass('current');
        $('.tabvsn').removeClass('current');
        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    });
    $('.btnTabs a').click(function(){
        var tab_id = $(this).attr('data-tab');
        $('.btnTabs a').removeClass('current');
        $('.tabvsns').removeClass('current');
        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    });
}
function userInfo(){
    $('.userinfoLink p').on('click', function(){
        $('.drpdwn').slideToggle();
    });
    $(document).on('click',function(e){
        var parentarea = $('.userinfoLink');
        var elm = $('.drpdwn');
        if(parentarea.has(e.target).length === 0) {
            elm.slideUp();
        }
    });
}
function editableField(){
    $('.fieldEdit').on('dblclick', function(){
        $(this).append('<input class="fieldInputEdt" type="text" name="" placeholder="Change the value">');
        $('.fieldInputEdt').focus();
    });
    $(document).on('click',function(e){
        var parentarea = $('.fieldEdit');
        var elm = $('.fieldInputEdt');
        if(parentarea.has(e.target).length === 0) {
            if(elm.val() == ""){
                elm.parent().text();
            } else {
                elm.parent().text(elm.val());
            }
            elm.remove();
        }
    });
}
function deleteOption(){
    $(".delMsg").on('click', function () {
        $(".DeleteOption").addClass('openDel');
        $(".delCover").addClass('openSlide');
        if ( $('.tbchek input[type="checkbox"]:checked').length > 0) {
            $(".nonSelectField, .nonsel").hide();
            $(".SelectField, .sel").show();
        } else {
            $(".nonSelectField, .nonsel").show();
            $(".SelectField, .sel").hide();
        }
    });
    $(".btnCLOSE").on('click', function () {
        $(".DeleteOption").removeClass('openDel');
        $(".delCover").removeClass('openSlide');
    });
}
function importOption(){
    $(".impMsg").on('click', function () {
        $(".ImportOption").addClass('openImp');
        $(".ImpCover").addClass('openImpt');
    });
    $(".btnCLOSE").on('click', function () {
        $(".ImportOption").removeClass('openImp');
        $(".ImpCover").removeClass('openImpt');
    });
}

function viewOption(){
    $('body').on('click','.viewDiv',function(){
        $(".ViewDescpt").addClass('openView');
        $(".ViewCover").addClass('openVew');
    });
    $(".btnCLOSE").on('click', function () {
        $(".ViewDescpt").removeClass('openView');
        $(".ViewCover").removeClass('openVew');
    });
}
function editProfile(){
    $(".openEditPro").on('click', function () {
        $(".EditOption").addClass('editImp');
        $(".EdtCover").addClass('editImpt');
        $('body').css("position", "fixed");
    });
    $(".btnCLOSE").on('click', function () {
        $(".EditOption").removeClass('editImp');
        $(".EdtCover").removeClass('editImpt');
        $('body').css("position", "static");
    });
}
function changepassword(){
    $(".openChangPass").on('click', function () {
        $(".ChangeOption").addClass('chngImp');
        $(".changeCover").addClass('chngImpt');
    });
    $(".btnCLOSE").on('click', function () {
        $(".ChangeOption").removeClass('chngImp');
        $(".changeCover").removeClass('chngImpt');
    });
}
function notifye(){
    // $(".alrtfy").on('click', function () {
    //     $(".allmsg").fadeIn(500).delay(3000).fadeOut(200);
    // });
    setTimeout(function(){
        $('#display-msg').hide();
    }, 5000);
}
function logins(){
    $(".forgtOpen").on('click', function () {
        $(".forgotCover").show();
        $(".LogCover").hide();
    });
    $(".bckLog").on('click', function () {
        $(".forgotCover").hide();
        $(".LogCover").show();
    });
}

//All Tab
const tourtabContent = () =>{
    jQuery('body').on("click",'.tour_tabMenu li a',function (){  
        var _thisParent = jQuery(this).parents('.tour_tabContainer');
        var indx = jQuery(this).parent().index();
        _thisParent.find(".tour_tabMenu li a").removeClass("actv");
        jQuery(this).addClass("actv");
        _thisParent.find(".tour_tabContent").hide();
        _thisParent.find(".tour_tabContent").eq(indx).fadeIn();
    });
    $('.tour_tabContent').each(function(index, item) {
        if(index===0){
            $(item).css('display','block');
        }
    });
    $('.tour_tabMenu li').each(function(index, item) {
        if(index===0){
            $(item).children('a').addClass('actv');
        }
    });

    jQuery('body').on("click",'.tour_tabMenu2 li a',function (){  
        var _thisParent = jQuery(this).parents('.tour_tabContainer2');
        var indx = jQuery(this).parent().index();
        _thisParent.find(".tour_tabMenu2 li a").removeClass("actv");
        jQuery(this).addClass("actv");
        _thisParent.find(".tour_tabContent2").hide();
        _thisParent.find(".tour_tabContent2").eq(indx).fadeIn();
    });
    $('.tour_tabContent2').each(function(index, item) {
        if(index===0){
            $(item).css('display','block');
        }
    });
    $('.tour_tabMenu2 li').each(function(index, item) {
        if(index===0){
            $(item).children('a').addClass('actv');
        }
    });
}

const accord = () =>{
    jQuery('body').on("click",'.accordmail .accordmail-btn',function (e){  
        e.preventDefault();
        jQuery('.accordmail-target').not(jQuery(this).next('.accordmail-target')).slideUp();
        jQuery(this).next('.accordmail-target').slideToggle();

        jQuery('.accordmail-btn').not(jQuery(this)).removeClass('actv');
        jQuery(this).toggleClass('actv');
    });
    jQuery('.accordmail').each(function(index, item) {
        if(index==0){
        jQuery  (item).children('.accordmail-btn').addClass('actv');
        jQuery  (item).children('.accordmail-target').css('display', "block");
        }
    });
}




const forms = () =>{
    let allFormField = document.querySelectorAll('.form-field');
    setTimeout(function(){
        for(let i = 0; i < allFormField.length; i++){
            if(allFormField[i].value){
                allFormField[i].parentNode.classList.add('has-value');
            }
        }
    },100);
    for(let i = 0; i < allFormField.length; i++){
       
        allFormField[i].addEventListener('focus', function(){
            this.parentNode.classList.add('has-value');
        });
        allFormField[i].addEventListener('blur', function(){
            if(!this.value){
                this.parentNode.classList.remove('has-value');
            }
        });
    }
    
    $('.form-file input[type="file"]').on('change', function () {
        var infile = $(this).val();
        var filename = infile.split("\\");
        filename = filename[filename.length - 1];
        $(this).parents('.form-file').find('#filename').text(filename);
        // $(this).parent().addClass('hasValueall');
    });
}