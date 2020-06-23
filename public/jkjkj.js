  var tutor_rice = new Vue({
  el: '#mainnav',
  data: {
    active: 'home'
  },
  methods: {
    makeActive: function(item){
        this.active = item;
        if(item == "tag1")
        {
          current = 0;
          $('#tag1').fadeIn();
          $('#tag3').css("display","none");
          $('#tag2').css("display","none");
          alloutS();
        }
        if(item == "tag2")
        {
          current = 1;
          $('#tag2').fadeOut();
          $('#tag1').css("display","none");
          $('#tag3').css("display","none");
          alloutS();
        }
        if(item == "tag3")
        {
          current = 2;
          $('#tag3').fadeOut();
          $('#tag1').css("display","none");
          $('#tag2').css("display","none");
          alloutS();
        }
    }
  }
  })
  tutor_rice.makeActive('tag1');
