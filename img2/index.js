var gets={
    tag: function(p, o) {
        return document.getElementById(p).getElementsByTagName(o);
    },
    ran: String(new Date()).split(":")[1],
    ua: navigator.userAgent,
    u:"http://ossweb-img.qq.com/images/lol/img/"
},hidDialogs = function() {
        need("biz.dialog", function(Dialog) {
            Dialog.hide();
        });
        $('#VideoContent').html('');
        pgvSendClick({
            hottag: 'v2.popup.close'
        })
    },
    JNav=function(){
        $('#J_nav').hover(function(){
            $('#J_subNav').css('visibility','visible');
        },function(){
            $('#J_subNav').css('visibility','hidden');
        });

        $('#J_play').on('click',function(){
                include("http://imgcache.gtimg.cn/tencentvideo_v1/tvp/js/tvp.player_v2_jq.js", function() {
                    var  player = new tvp.Player(),
                        video = new tvp.VideoInfo();
                    video.setVid('d0514kd3sc8');
                    player.create({
                        width:'900',
                        height:'550',
                        video:video,
                        isVodFlashShowCfg:0,
                        isVodFlashShowSearchBar:0,
                        isVodFlashShowEnd:0,
                        autoplay:1,
                        vodFlashSkin:"http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf",
                        modId:'VideoContent',
                        flashWmode:"transparent",
                        vodFlashExtVars: {
                            share: 0,
                            follow: 0,
                            bullet:0
                        }
                    });
                });

            need("biz.dialog",function(Dialog){
                Dialog.show({
                    id:'Video',
                    bgcolor:"#000",
                    opacity:70
                });
            });
            pgvSendClick({hottag:'v2.popup.video.play'})
        });


    }(),
    //����ģ�� news
    timeHoverNews,
    JNews = function() {
        $("#J_newsTab  > li").each(function(index) {
            $(this).mouseover(function() {
                clearTimeout(timeHoverNews);
                var _this = this;
                timeHoverNews = setTimeout(function(){
                    $(_this).addClass("current").siblings().removeClass("current");
                    $("#J_newsContent .news-content").eq(index).show().siblings().hide();
                },180);
            })
        });
        //var arr =[0,1,2,3,4,5,6,7,8,9,10,11];
        $('#J_newsContent .first img').each(function(){
            $(this).attr('src','http://ossweb-img.qq.com/images/lol/v2/news/pic-news'+(Math.floor(Math.random() * 12 + 1)-1)+'.jpg')
        });
        //var voteLINK = $("#setNum").data('link');
        //$('#J_voteTips').attr("href", voteLINK);
    }(),
    //Ӣ��Ƥ��ģ�� heroSkin
    timeHoverSkin,
    JHeroSkin = function() {
        $("#J_heroTab  > li").each(function(index) {
            $(this).mouseover(function() {
                clearTimeout(timeHoverSkin);
                var _this = this;
                timeHoverSkin = setTimeout(function(){
                    $(_this).addClass("current").siblings().removeClass("current");
                    $(".hero-content").eq(index).show().siblings('.hero-content').hide();
                },180);
            })
        });

        function loadFreeData(data, time) {
            var f = "http://ossweb-img.qq.com/images/lol/v2/champion/avatar/",
                d = [];
            for (var j in data) {
                d.push('<a title="' + data[j].name + " " + data[j].title + '" href="/web201310/info-defail.shtml?id=' + data[j].id + '" target="_blank" onclick="pgvSendClick({hottag:\'main.hero.freeHero.' + data[j].id + '\'})"><img width="195" height="70" alt="' + data[j].name + ' ' + data[j].title + '" src="' + f + data[j].id + '.jpg"><span class="sbg">' + '<span class="first-name">' + data[j].name + '</span></span></a>');
            }
            g("J_freeList").innerHTML = d.join('');
            g("J_freeDate").innerHTML = '���ʱ�䣺' + time[0] + ' �� ' + time[1];
        }
        var s = g("J_freeList").innerHTML;
        if (s.indexOf("������") != -1) {
            if ("undefined" == typeof(LOLherojs)) {
                loadScript("http://lol.qq.com/biz/hero/free.js?v=" + gets.ran, function() {
                    var data = LOLherojs.free.data,
                        time = LOLherojs.free.date;
                    loadFreeData(data, time);
                });
            } else {
                loadFreeData(LOLherojs.free.data, LOLherojs.free.date);
            }

        }
        loadScript("http://lol.qq.com/biz/api/heroSkinActV2.js?v=" + gets.ran, function() {
            var heroData = heroActData,
                skinData = skinActData;
            var htmlHero = '',
                htmlSkin = '<a class="skin-first" onclick="pgvSendClick({hottag:\'main.hero.newSkin.a20170703skt\'})" href="http://lol.qq.com/act/a20170703skt/" target="_blank"><img src="http://ossweb-img.qq.com/images/lol/v2/skin/recommend/a20170703skt.jpg" width="400" height="145"></a>';
            for (var i = 0; i < 10; i++) {
                var h = heroData[i];
                htmlHero += '<a href="http://lol.qq.com/act/' + h.url + '/" target="_blank" onclick="pgvSendClick({hottag:\'main.hero.newHero.' + h.url + '\'})"' + '><img src="http://ossweb-img.qq.com/images/lol/v2/champion/avatar/' + h.id + '.jpg" width="195" height="70" alt=""><span class="sbg"><span class="first-name">' + h.name + '</span></span></a>';
            }
            for (var j = 0; j < 6; j++) {
                var s = skinData[j];
                htmlSkin += '<a href="http://lol.qq.com/act/' + s.url + '/" target="_blank" onclick="pgvSendClick({hottag:\'main.hero.newSkin.' + s.url + '\'})"' + '><img src="http://ossweb-img.qq.com/images/lol/v2/skin/' + s.url + '.jpg" width="195" height="70" alt=""><span class="sbg"><span class="first-name">' + s.name + '</span>' + '</span></a>';
            }
            $("#J_heroNew").html(htmlHero);
            $("#J_skinNew").html(htmlSkin);
        });
    }(),
    //�ֲ� promo
    t = 0,
    JGetPromo = function() {
        loadScript("http://game.qq.com/time/qqadv/Info_new_15282.js?v=" + gets.ran, function() {
            var promoArray = '',
                promoTriggerArray = '',
                ShowAdList = new Array(); //����EASͳ�� 1
            var count = 0;
            for (var item in oDaTaNew15282) {
                var d = oDaTaNew15282[item];
                if (d && d[5] == 20) {
                    count++;
                    var e_code = EAS.GetECode(d[1]),/*������e_code������*/
                        ShowAdInfo = '15282' + "." + item + "." + d[8] + "." + e_code;
                    ShowAdList.push(ShowAdInfo);
                    promoArray += '<li class="promo-item"><a onclick="EAS.ADClick(\'' + d[1] + '\');pgvSendClick({hottag:\'v2.promo.r' + count + '.' + d[8] + '\'});" href="' + d[1] + '" target="_blank"><img src="http://ossweb-img.qq.com/upload/adw/' + d[2] + '" width="820" height="350" alt="' + decodeURI(d[0]) + '"></a></li>';
                    promoTriggerArray += '<span class="trigger-item">' + decodeURI(d[0]) + '</span>';
                    //����EASͳ�� 3
                    if (count == 5) {
                        var ShowAdStr = ShowAdList.join("|");
                        if (typeof(EAS.SendClick) == 'function') {
                            EAS.SendClick({
                                'e_c': ShowAdStr,
                                'c_t': 1
                            });
                        }
                    }
                }
            }
            g('promoInner').innerHTML = promoArray;
            g('promoTrigger').innerHTML = promoTriggerArray;

            var amount = 5,
                ts = amount - 1,
                p = 0;
            $('#promoTrigger span').eq(0).addClass('on');
            var timeout;
            timeout = setTimeout(function() {
                promoMove();
            }, 5000);
            $('#promoTrigger span').each(function(index) {
                //var timeNavHover;
                $(this).mouseover(function() {
                    //clearTimeout(timeNavHover);
                    //timeNavHover = setTimeout(function(){
                    clearInterval(timeout);
                    t = index;
                    $("#promoInner").animate({
                        'marginLeft': -t * 820 + 'px'
                    }, {
                        queue: false,
                        duration: 200
                    });
                    $('#promoTrigger span').eq(t).addClass('on').siblings().removeClass('on');
                    timeout = setInterval(function() {
                        promoMove();
                    }, 5000);
                    //},100);
                });
            });
            //����Ч��
            function promoMove() {
                t = parseInt(t + 1);
                if (t > ts) {
                    t = 0;
                }
                if (t < 0) {
                    t = ts;
                }
                p = t;
                $("#promoInner").animate({
                    'marginLeft': -p * 820 + 'px'
                }, {
                    queue: false,
                    duration: 200
                });
                $('#promoTrigger span').eq(p).addClass('on').siblings().removeClass('on');
            }
        });
    }(),
    //���˵�����
    menu_status={'m1':0,'m2':0,'m3':0,'m4':0},
    JMenu = function(){

        $('#J_menu li.menu-item').each(function(index){
            $(this).on('click',function(){
                //$('.home-slide').animate({
                //    'marginLeft': -(1240 * index) +'px'
                //}, 0);
                $(this).addClass("cur").siblings().removeClass("cur");
                $('.home-slide-item').eq(index).addClass('cur-slide').siblings().removeClass("cur-slide");
                $('.home-slide-item').eq(index).fadeIn(500).siblings().fadeOut(500);

                pgvSendClick({hottag:'v2.menu.m'+index+'.click'});


                if(index == 2 )
                {
                    // include("http://lol.qq.com/v2/js/matchIndex.js", function() {
                    //     MATCH_HOME_PAGE.Init();
                    // });
                    matchLoad.init();
                    if(menu_status.m3 == 0){
                        menu_status.m3 =1;
                        pgvSendClick({hottag:'v2.menu.m'+index+'.first'})
                    }else{
                        pgvSendClick({hottag:'v2.menu.m'+index+'.again'})
                    }
                }else{
                    if(menu_status.m3 == 1){
                        // matchLoad.clearLiveVideo();
                    }
                    if(index == 0)
                    {
                        if(menu_status.m1 == 0){
                            menu_status.m1 =1;
                            pgvSendClick({hottag:'v2.menu.m'+index+'.first'})
                        }else{
                            pgvSendClick({hottag:'v2.menu.m'+index+'.again'})
                        }
                    }
                    if(index == 1)
                    {
                        if(menu_status.m2 == 0){
                            include("http://lol.qq.com/v2/js/videoIndex.js", function() {});
                            menu_status.m2 =1;
                            pgvSendClick({hottag:'v2.menu.m'+index+'.first'})
                        }else{
                            pgvSendClick({hottag:'v2.menu.m'+index+'.again'})
                        }
                    }
                    if(index == 3)
                    {
                        if(menu_status.m4 == 0){
                            include("http://lol.qq.com/v2/js/activeIndex.js", function() {
                                $('.act-tab li').click(function(){
                                    $(this).addClass('active').siblings().removeClass('active');
                                })

                            });
                            menu_status.m4 =1;
                            pgvSendClick({hottag:'v2.menu.m'+index+'.first'})
                        }else{
                            pgvSendClick({hottag:'v2.menu.m'+index+'.again'})
                        }
                    }

                }

            })
        });
    }(),
    timeHoverRecommend,
    JRecommend = function(){
        $("#J_recommendTab  > li").each(function(index) {
            $(this).mouseover(function() {
                clearTimeout(timeHoverRecommend);
                var _this = this;
                timeHoverRecommend = setTimeout(function(){
                    $(_this).addClass("current").siblings().removeClass("current");
                    $(".recommend-content").eq(index).show().siblings('.recommend-content').hide();
                },180);
            })
        });
        var submitURI = 'http://lol.qq.com/web201310/js/videodata/LOL_VIDEOLIST_IDX2.js?r='+Math.random();
        $.getJSON(submitURI, function(data) {
            if (0 == data.status) {
                if('object'==typeof(data.msg.newlist)) {
                    var retHTML0 = '';
                    $.each(data.msg.newlist, function(i, info){
                        if(i<6) {
                            var url = info.url+'&ADTAG=lolweb.v2.home.r'+i;
                            retHTML0 += '<li><a class="pv-lnk" href="'+url+'" target="_blank"><img src="'+info.thumb+'" alt=""><span class="pa pv-cover-1"></span><span class="pa pv-cover-ico"></span><span class="shadow1"><i>'+ info.time+'</i></span><h5>'+info.title+'</h5></a></li>';
                        }
                    });
                    $("#J_recommendVideo").html(retHTML0);
                }else{
                    var retHTML0 = '<li class="noresult">'+'�������ݣ������Ժ����ԣ�'+'</li>';
                    $("#J_recommendVideo").html(retHTML0);
                }
            }
        });

        loadScript("http://ossweb-img.qq.com/images/clientpop/act/lol/lol_act_1_index_special.js?v="+gets.ran,function(){
            var self = action,iHtml='',idate='',data=null,count=0;
            function strHtml(){
                return '<li><a class="act-img" href="'+data.sActDetailUrl +'&ADTAG=lolweb.v2.home" title="'+decodeURIComponent(data.sName) +'"><img alt="'+decodeURIComponent(data.sName) +'" src="'+data.sBigImgUrl+'"><span class="act-num">����<strong class="act-num-f">'+data.iJoin+'</strong>�˹�ע</span>'+idate+'</a><div class="act-innr"><h4 class="act-tit w-s-n"><h4 title="'+decodeURIComponent(data.sName) +'">'+decodeURIComponent(data.sName) +'</h4><p class="act-date w-s-n">�ʱ�䣺<span>'+dataTimes+'</span></p><p class="act-intro w-s-n">'+decodeURIComponent(data.sDescripion)+'</p></div></li>';
            }
            for(var x in self){
                if(count < 4){
                    count++;
                    data = self[x];
                    dataTimes = data.dtBegin+'~'+data.dtEnd;
                    if(data.iStatus == 0){
                        idate = '<span class="act-times act-over">��δ��ʼ</span>';
                    }else if(data.iStatus == -1){
                        idate = '<span class="act-times act-over">�ѽ���</span>';
                    }else if(data.iStatus == 999){
                        idate = '<span class="act-times act-long">���ڻ</span>';
                        dataTimes = '����';
                    }else if(data.iStatus == 1){
                        idate = '<span class="act-times act-processing">'+data.iDate+'������</span>';
                    }
                    iHtml+=strHtml();
                }
            }
            if(iHtml==''){iHtml = '<p class="loading">���ͣ�������ػŶ!</p>'}
            g('J_recommendAct').innerHTML = iHtml;
        });
    }(),
matchLoad = {
    dLiveFlag : false,// ��ǰҳ���Ƿ���ֱ����falseû�У�true��
    dVideoPage : "http://lpl.qq.com/es/video_detail.shtml",
    dSeedingPage : "http://lpl.qq.com/es/live.shtml",
    dStatPage : "http://lpl.qq.com/es/stats.shtml",
    dHistoryPage��: "http://lpl.qq.com/es/history.shtml",
    dGroupTeamScore : {},// ���ְ�����
    dTeamScoreBar : [5],// ���ְ�tab��Ŀǰֻ��LPLһ������id
    dVideosTabNum : 12,// ������Ƶ--��ʾ����һ��tab
    dVideosSTabNum : 12,// ������Ƶ--ȫ���ع�--��ʾ����һ������tab
    dVideoList : {}, // ������Ƶ-�Ѽ�������(��Ϊ����)
    dDefaultMatchNum : 1,// ��ʾ��ʾ�ڼ����������̣���������Ĭ����ʾ��1����(��һҳ)�������ֱ��������ֱ�����ڵ�ҳ�����ûֱ���������һ��δ��ʼ��ҳ
    dUnStartMatchNum : 1,//���һ��δ��ʼ������
    init: function () {
    	var arr = ["http://lpl.qq.com/web201612/data/LOL_MATCH2_GAME_LIST_BRIEF.js","http://lpl.qq.com/web201612/data/LOL_MATCH2_TEAM_LIST.js","http://lpl.qq.com/web201612/js/public.js","http://lpl.qq.com/web201612/data/LOL_NEWMATCH_FIR_PAGE_VIDEO_TAB.js","http://lpl.qq.com/web201612/data/LOL_MATCH2_NEWS_CATE_LIST.js","http://lpl.qq.com/web201612/data/LOL_NEWMATCH_FIR_PAGE_WORLDHERO_TAB.js"];
		include(arr,function(){
			//�����Ѷ�ֲ�
	    	matchLoad.initRecNews();
	        //���̱��ʼ��
	        matchLoad.matchList();
	        //��Ѷ�б��ʼ��
	        matchLoad.initNewsList();
	        //ս�ӻ��ְ�
	        matchLoad.initTeamScore();
	        //������Ƶ��ʼ��
	        matchLoad.initVideoNewsTab(); 
	        //���ְ�һ�����µ���¼�
	        $(".match-integral .match-title li").on("click",function(){
	        	var self = matchLoad;
	        	var _idx = $(this).index();
	        	// ��Ⱦ���ְ�
	        	var ret = self.FillTeamScoreHtml(self.dTeamScoreBar[_idx]);
	        	if(ret){
	        		$("#group_bar a").eq(0).trigger("click");
	        		$(this).addClass('on').siblings().removeClass('on');
	        	}else{
	        		alert("���ָ����У������ڴ�");
	        	}
	        });
		});
    },
    /**
	 * ��ʼ�������ֲ�����
	 */
	initRecNews : function(){
		var self = matchLoad;
		var sHtml = "";
		var titleHtml = "";
		var goUrl = "http://lpl.qq.com/web201612/data/LOL_NEWMATCH_FIR_PAGE_RECO_INFO.js";
		$.getScript(goUrl,function(){
			if(FirPageRecoInfo.status==0){
				var data = FirPageRecoInfo.msg[60][61];
				if(data!="" && data.length==3){
				    var curr=0;
					for(var x in data){
						sHtml += '<li class="match-promo-item">'
							   + '<a href="'+data[x].sUrl+'" onclick="pgvSendClick({hottag:\'v2.match.promo.r'+ curr +'\'})" target="_blank">'
							   + '<img src="'+data[x].sIMG+'" width="820" height="350" alt="'+data[x].sTitle+'">'
							   + '</a>'
							   + '</li>';
						curr++;
						titleHtml += '<span class="trigger-item">'+data[x].sTitle+'</span>';
							   
					}
					$("#promoInner_match").html(sHtml);
					$("#promoTrigger_match").html(titleHtml);
					self.matchPromo('promoInner_match','promoTrigger_match');
					return;
				}
			}
			$("#promoInner_match").html("");
			$("#promoTrigger_match").html("");
		});
	},
	/**
	 * �����б�
	 */
    matchList:function () {
    	var self = matchLoad;
    	var bGameList = GameList.msg.bGameList;
		var teamList = TeamList.msg;
		var today = milo.toDateString();
		var bGameName = '',
		    sHtml = '';
    	var goUrl = "http://lpl.qq.com/web201612/data/LOL_MATCH2_MATCH_HOMEPAGE_BMATCH_LIST_NEW.js";
    	var mySwiper = {};//���һ����������
    	$.getScript(goUrl,function(){
    		if(FirPageBMatchs.status==0){
    			var matchList = FirPageBMatchs.msg;
    			for(var x in matchList){
    				//��ȡһ������ID
    				for(var i in bGameList){
						if(matchList[x].bGameId==bGameList[i].GameId){
							bGameName = bGameList[i].GameName;
						}
					}
					var dateArr = matchList[x].MatchDate.split(" ");
					//����״̬
					if(+matchList[x].MatchStatus==1){
						sHtml += '<li class="swiper-slide match-not-begin">';
					}else if(+matchList[x].MatchStatus==2){
						sHtml += '<li class="swiper-slide match-ing">';
					}else{
						sHtml += '<li class="swiper-slide">';
					}
					sHtml += '<div class="match-schedule">'
						   + '<div class="match-list-top">'
						   + '<p> <span>'+dateArr[0].substr(5,5)+'</span>&nbsp; <b>'+dateArr[1].substr(0,5)+'</b> </p>'
						   + '<em>'+TOOLS.FormateMatchStatus(+matchList[x].MatchStatus)+'</em>'
						   + '</div>'
						   + '<div class="match-score-box clearfix"> '
						   + '<div class="match-corps">'
						   + '<img alt="" src="'+teamList[matchList[x].TeamA].TeamLogo+'">'
						   + '<p>'+teamList[matchList[x].TeamA].TeamName+'</p>'
						   + '</div>'
						   + '<div class="match-score"> '
						   + '<p> <span>'+matchList[x].ScoreA+'</span> </p>'
						   + '<p class="match-score-right"> <span>'+matchList[x].ScoreB+'</span> </p>'
						   + '</div>'
						   + '<div class="match-corps">'
						   + '<img alt="" src="'+teamList[matchList[x].TeamB].TeamLogo+'">'
						   + '<p>'+teamList[matchList[x].TeamB].TeamName+'</p>'
						   + '</div>'
						   + '</div>';
					//�ۿ�ֱ��/�鿴ս��/�����ڴ���ť
					if(+matchList[x].MatchStatus==1){
						if(!self.dLiveFlag){
							self.dDefaultMatchNum = +x+1;
						}
						if(+matchList[x].iQTMatchId){
							sHtml += '<a id="dinyue_'+matchList[x].iQTMatchId+'" class="match-btn" href="javascript:PUBLIC_FUNCTION.DinYue('+matchList[x].iQTMatchId+');">ԤԼֱ��</a>';
						}else{
							// ְҵ������ʾ�鿴��ʷ������������ʾ�����ڴ�
							if(+matchList[x].bGameId==5){
								sHtml += '<a target="_blank" class="match-btn" href="'+self.dHistoryPage+'?bmid='+matchList[x].bMatchId+'">�鿴��ʷ</a>';
							}else{
								sHtml += '<a class="match-btn" href="javascript:;">�����ڴ�</a>';
							}
							
						}
						if(dateArr[0] >= today && self.dUnStartMatchNum==1){
							self.dUnStartMatchNum = +x;
						}
					}else if(+matchList[x].MatchStatus==2){
						sHtml += '<a class="match-btn" target="_blank" href="'+self.dSeedingPage+'?bgid='+matchList[x].GameId+'&bmid='+matchList[x].bMatchId+'">�ۿ�ֱ��</a>';
						if(!self.dLiveFlag){
							self.dDefaultMatchNum = +x;
							self.dLiveFlag = true;
						}
					}else{
						if(+matchList[x].bGameId==5 || +matchList[x].bGameId==7){
							sHtml += '<a target="_blank" class="match-btn" href="'+self.dStatPage+'?bmid='+matchList[x].bMatchId+'">�鿴ս��</a>';
						}else{
							if(+matchList[x].NewsId){
								sHtml += '<a target="_blank" class="match-btn" href="'+self.dVideoPage+'?nid='+matchList[x].NewsId+'">�ۿ���Ƶ</a>';
							}else{
								sHtml += '<a class="match-btn" href="javascript:;">��Ƶ������</a>';
							}
						}
					}
					sHtml += '<p>'+bGameName+'</p>'
					       + '<p><em>'+matchList[x].GameName.substr(0,4)+'����'+matchList[x].GameTypeName+ ' '+matchList[x].GameProcName+'</em></p>'
					       + '</div>'
					       + '</li>';
    			}
    			//û��ֱ����Ĭ���������һ��δ��ʼ�����ڵ�ҳ
    			if(!self.dLiveFlag){
    				self.dDefaultMatchNum = self.dUnStartMatchNum;
    			}
    			$('.match-list .match-list-swiper ul').html(sHtml);
    			include("http://lol.qq.com/v2/js/idangerous.swiper2.7.6.min.js", function() {
    	            /* �����л���� S */
    	            mySwiper  = new Swiper ('.match-list-swiper', {
    	                slidesPerView:5,
    	                slidesPerGroup:5,
    	                mode: 'horizontal',
    	                simulateTouch:false,
    	                onFirstInit: function (swiper) {
    	                    $('#left-btn').addClass('disabled');
    	                    var totalPage = $('.match-list li').length%5 == 0 ? parseInt($('.match-list li').length/5) : parseInt($('.match-list li').length/5)+1;
    	                    if (totalPage == 1) $('#right-btn').addClass('disabled');
    	                },
    	                onSlideChangeStart: function (swiper) {
    	                    var totalPage = $('.match-list li').length%5 == 0 ? parseInt($('.match-list li').length/5) : parseInt($('.match-list li').length/5)+1;
    	                    if (totalPage == 1) return;
    	                    var activePage = swiper.activeIndex%5 == 0 ? parseInt(swiper.activeIndex/5) : parseInt(swiper.activeIndex/5)+1;
    	                    $('#left-btn, #right-btn').removeClass('disabled');
    	                    if (activePage === 0) {
    	                        $('#left-btn').addClass('disabled');
    	                    } else if (activePage === totalPage-1) {
    	                        $('#right-btn').addClass('disabled');
    	                    }
    	                }
    	            });
    	            $('#left-btn').on('click', function(){
    	                mySwiper.swipePrev();
    	            });
    	            $('#right-btn').on('click', function(){
    	                mySwiper.swipeNext();
    	            });
    	            /* �����л���� E */
    	            //�л���ָ��ҳ   swipeTo���뵥��li���
    	            mySwiper.swipeTo(parseInt(self.dDefaultMatchNum/5)*5);
    	        });
    		}
    	});
    },
    /**
     * ��Ѷ�б�
     */
    initNewsList : function(){
    	var self = matchLoad;
    	var sHtml = "";
		var goUrl = "http://lpl.qq.com/web201612/data/LOL_NEWMATCH_FIR_PAGE_NEWS_INFO.js";
		$.getScript(goUrl,function(){
			if(FirPageNewsInfo.status==0){
				var dNewsList = FirPageNewsInfo.msg;
				// ������Ѷ
				sHtml = "";
				if(dNewsList['jj'] &&��dNewsList['jj'].length>0){
					var data = dNewsList['jj'];
					for(var x in data){
						//ֻչʾ6����Ѷ
						if(+x>=6){
							break;
						}
						sHtml += '<li><a href="'+data[x].sUrl+'" onclick="pgvSendClick({hottag:\'v2.match.news.r'+ data[x].NewsId +'\'})"  target="_blank" class="clearfix"><span>'+data[x].sTitle+'</span><em>'+data[x].sIdxTime.substr(5,5)+'</em></a>';
					}
				}
				$("#jj_news").html(sHtml);
			}
		});
		//ģ����Ѷ
		var shtml = "";
		goUrl = "http://lpl.qq.com/web201612/data/LOL_NEWMATCH_FIR_PAGE_STATIC_NEWS_INFO.js";
		$.getScript(goUrl,function(){
			if(FirPageSNewsInfo.status==0){
				var data = FirPageSNewsInfo.msg[0].Contents;
				var domTmp = $(data);
				shtml += '<a href="'+$(domTmp).find("a")[0].href+'" onclick="pgvSendClick({hottag:\'v2.match.news.r0000\'})"   target="_blank" class="match-news-head">'+$(domTmp).find("a")[0].innerHTML+'</a>'
				       + '<a href="'+$(domTmp).find("a")[1].href+'" onclick="pgvSendClick({hottag:\'v2.match.news.r0001\'})"    target="_blank" class="match-news-sub">'+$(domTmp).find("a")[1].innerHTML+'</a>';
				$("#static_news").html(shtml);
			}
		});
    },
    /**
     * ��ʼ�����ְ�
     */
    initTeamScore : function(){
    	var self = matchLoad;
    	var goUrl = "http://lpl.qq.com/web201612/data/LOL_NEWMATCH_FIRPAGE_GROUP_TEAM_SCORE.js";
    	$.getScript(goUrl,function(){
			if(GroupTeamScores.status==0){
				self.dGroupTeamScore = GroupTeamScores.msg;
				// Ĭ����ʾLPL��������
				$(".match-integral .match-title li").eq(0).trigger("click");
			}else{
				self.dGroupTeamScore = "";
			}
		})
    },
    /**
	 * ��Ⱦ���ְ�����-���鵼��
	 */
	FillTeamScoreHtml : function(bGameId){
		var self = matchLoad;
		var sHtml = "";
		if(self.dGroupTeamScore){
			var scores = self.dGroupTeamScore[bGameId].score;
			var groups = self.dGroupTeamScore[bGameId].group;
			// û�л���
			if(groups==""){
				return false;
			}
			else{
				groups.sort(function(a, b) {
					return a.Group > b.Group
				});
				for(var x in groups){
					group = groups[x].Group;
					self.FillGroupTeamScoreBoardHtml(scores[group],group);
					sHtml += '<a href="javascript:;" class="on" rel="'+group+'">'+group+'��</a>';
				}
				$("#group_bar").html(sHtml);
				$('#group_bar a').unbind("click"); 
				$("#group_bar a").on("click",function(){
					$(this).addClass('on').siblings().removeClass('on');
					$("[id^=team_score_board_]").css({display:"none"}).eq($(this).index()).css({display:"table"});
				});
			}
			// ����δ���飬���ط���tab
			if(groups.length==1){
				$("#group_bar").hide();
			}else{					
				$("#group_bar").show();
			}
			return true;
		}
	},
	/**
	 * ��Ⱦ���ְ�����-���ְ�����
	 */
	FillGroupTeamScoreBoardHtml : function(data,flag){
		var self = matchLoad;
		var teamList = TeamList.msg;
		var sHtml = "";
		if(data){
			for(var x in data){
				var scoreInfo = data[x];
				sHtml += '<tr> '
					   + '<td><em>'+(+x+1)+'</em></td>'
					   + '<td class="clearfix"> <a target="_blank" href="http://lpl.qq.com/es/team_detail.shtml?tid='+scoreInfo.TeamId+'">'
					   + '<img src="'+teamList[scoreInfo.TeamId].TeamLogo+'"> <b>'+scoreInfo.TeamName+'</b></a></td>'
					   + '<td><span>'+scoreInfo.Value1+'</span>/<span>'+scoreInfo.Value3+'</span></td>'
					   + '<td>'+scoreInfo.Score+'</td>'
					   + '</tr>';
			}
		}
		if(flag=="0"){
			flag = "A";
		}
		$("#team_score_board_"+flag).html(sHtml);
	},
	/**
	 * ��ʼ����Ƶ����-һ��tab
	 */
	initVideoNewsTab : function(){
		var self = matchLoad;
		var tabIds = VideoTab.msg.Title.split('#');
		var htmlStr = '';
		var limit = (tabIds.length<=self.dVideosTabNum?tabIds.length:self.dVideosTabNum);
		for(var i=0;i<limit;i++){
			var id = tabIds[i];
			switch(id){
				case '0':
					htmlStr += '<li class="on" onclick="matchLoad.initVideoNews(0,this)">ȫ��</li>';
					break;
				case '20':
					var cateInfo = self.getCateById(id);
					htmlStr += '<li id="cate20" onclick="matchLoad.initVideoNews(20,this)">'+cateInfo['CateName']+'</li>';
					break;
					//��������Ӣ��tab�������ʾ����Ӣ�۸�����Ŀ  add by 996 20170712
				case '112':
					var cateInfo = self.getCateById(id);
					htmlStr += '<li id="cate112" onclick="matchLoad.initVideoNews(112,this)">'+cateInfo['CateName']+'</li>';
					break;
				default:
					var cateInfo = self.getCateById(id);
					htmlStr += '<li onclick="matchLoad.initVideoNews('+cateInfo['CateId']+',this)">'+cateInfo['CateName']+'</li>';
					break;
			}
		}
		self.initVideoMathchTab();
		self.initWorldHeroVideoTabs();
		$("#videoSortList").html(htmlStr);
		$('#videoSortList li').eq(0).trigger('click');
	},
	/**
	 * ��ʼ����Ƶ����-ȫ���ع�����Ķ���tab-һ������tab
	 */
	initVideoMathchTab : function (){
		var self = matchLoad;
		var bGameList = GameList.msg.bGameList;
		var length = bGameList.length;
		var limit = length<=self.dVideosSTabNum?length:self.dVideosSTabNum;
		var sHtml = '';
		self.dBGameList = bGameList;
		for(var i=0;i<limit;i++){
			sHtml += '<li onclick="matchLoad.initVideoNews('+bGameList[i].GameId+',this,1);">'+bGameList[i].GameName+'</li>';
		}
		$("#sVideoSortList").html(sHtml);
	},
	/**
	 * ��������Ӣ��tab�������ʾ����Ӣ�۸�����Ŀ  add by 996 20170712
	 */
	initWorldHeroVideoTabs : function (){
		var self = matchLoad;
		var data = WorldHeroTab.msg.Title.split('#');
		var length = data.length;
		var limit = length<=self.dVideosSTabNum?length:self.dVideosSTabNum;
		var sHtml = '';
		for(var i=0;i<limit;i++){
			cateInfo = self.getCateById(data[i]);
			sHtml += '<li onclick="matchLoad.initVideoNews('+data[i]+',this,2);">'+cateInfo['CateName']+'</li>';
		}
		$("#sVideoSortList-1").html(sHtml);
	},
	/**
	 * ����������Ƶ����
	 */
	initVideoNews : function(id,obj,flag){
		var self = matchLoad;
		var sHtml = "";
	
		if(id==20 && !flag){
			$('#sVideoSortList').show();
			$('#sVideoSortList-1').hide();
			$('#sVideoSortList li').eq(0).trigger('click');
			return;
		}else if(id==112 && !flag){
			$('#sVideoSortList-1').show();
			$('#sVideoSortList').hide();
			$('#sVideoSortList-1 li').eq(0).trigger('click');
			return;
		}
		else if((id!=20 || id!=112) && (!flag)){
			$('#sVideoSortList').hide();
			$('#sVideoSortList-1').hide();
		}
		// �ж������Ƿ��Ѿ����ع�
		var data;
		if(flag==1){
			if(self.dVideoList[20] && self.dVideoList[20][id]){					
				data = self.dVideoList[20][id];
			}
		}
		else if(flag==2){
			if(self.dVideoList[112] && self.dVideoList[112][id]){					
				data = self.dVideoList[112][id];
			}
		}
		else{
			if(self.dVideoList[id] && !flag){
				data = self.dVideoList[id];
			}
		}
		if(data){
			self.fillVideoList(data);
			if(obj){
				$(obj).addClass('on').siblings().removeClass('on');
				if(flag==1){
					$('#cate20').addClass('on').siblings().removeClass('on');
				}
				if(flag==2){
					$('#cate112').addClass('on').siblings().removeClass('on');
				}
			}
		} else {
			if(id==0){
				// ȫ��
				var goUrl = "http://lpl.qq.com/web201612/data/LOL_NEWMATCH_HOMEPAGE_LATEST_VIDEOS_LIST.js";
			}else if(flag==1){
				// ���»ع˶������� �������²�ѯ
				var goUrl = "http://apps.game.qq.com/lol/match/apis/searchNewsInfo.php?p3=20&p8=2&p0="+id+"&r1=VideoInfo&pagesize=10";
			}
			else if(flag==2){
				// ����Ӣ��tab����ĸ�����������
				var goUrl = "http://apps.game.qq.com/lol/match/apis/searchNewsInfo.php?p8=2&p3="+id+"&r1=VideoInfo&pagesize=12";
			}
			else{
				// ������������
				var goUrl = "http://apps.game.qq.com/lol/match/apis/searchNewsInfo.php?p8=2&p3="+id+"&r1=VideoInfo&pagesize=10";
			}
			$.getScript(goUrl,function(){
				if(VideoInfo.status==0){
					if(id==0){							
						var data = VideoInfo.msg;
					}else{							
						var data = VideoInfo.msg.result;
					}
					if(flag==1){
						if(!self.dVideoList[20]){
							self.dVideoList[20] = {};
						}
						self.dVideoList[20][id] = data;
					}
					else if(flag==2){
						if(!self.dVideoList[112]){
							self.dVideoList[112] = {};
						}
						self.dVideoList[112][id] = data;
					}
					else{
						self.dVideoList[id] = data;
					}
					if(data!=""){
						self.fillVideoList(data);
					}
					if(obj){
						$(obj).addClass('on').siblings().removeClass('on');
						if(flag==1){
							$('#cate20').addClass('on').siblings().removeClass('on');
						}
						if(flag==2){
							$('#cate112').addClass('on').siblings().removeClass('on');
						}
					}
				}else{
					alert(VideoInfo.msg);
				}
			});
		}
	},
	/**
	 * ���������Ƶ����
	 */
	fillVideoList: function(data){
		var self = matchLoad;
		var sHtml = '';
		for(var x in data){
			//չʾ10������
			if(+x>=10){
				break;
			}
			var videoData = jQuery.parseJSON(data[x].sExt1);
			var min = Math.floor(+videoData.iTime/60);
			if(min.toString().length<=1){
				min = '0'+min;
			}
			var sec = +videoData.iTime%60;
			if(sec.toString().length<=1){
				sec = '0'+sec;
			}
			if(+x>0 && (+x+1)%5 == 0){
				sHtml += '<li class="margin-right"> <a target="_blank" class="match-video-img" href="'+self.dVideoPage+'?nid='+data[x].NewsId+'"> <img src="'+videoData.sImg+'"></a><p> <i></i> <em>'+TOOLS.ReloadPubdate(data[x].indexDate)+'</em> <span>'+min+':'+sec+'</span> </p><a href="'+self.dVideoPage+'?nid='+data[x].NewsId+'" class="text">'+videoData.sName+'</a> </li>';
            }else{
            	sHtml += '<li> <a target="_blank" class="match-video-img" href="'+self.dVideoPage+'?nid='+data[x].NewsId+'"> <img src="'+videoData.sImg+'"></a><p> <i></i> <em>'+TOOLS.ReloadPubdate(data[x].indexDate)+'</em> <span>'+min+':'+sec+'</span> </p><a href="'+self.dVideoPage+'?nid='+data[x].NewsId+'" class="text">'+videoData.sName+'</a> </li>';
            }
		}
		$("#video_list").html(sHtml);
	},
	/**
	 * ��ȡ��Ѷ����
	 */
	getCateById : function (id){
		if ('undefined' == typeof (NewsCateList['msg'][id][0])) {
			return false;
		}
		return NewsCateList['msg'][id][0];
	},
    /**
     * ��Ѷ�ֲ�����ʵ��
     */
    matchPromo:function (boxId,btnId) {
        var boxID = $('#'+boxId),
            btnID = $('#'+btnId),
            t,
            timeout;
        var amount = 3,
            ts = amount - 1,
            p = 0;

        btnID.find('span').eq(0).addClass('on');
        t = 0;
        boxID.animate({
            'marginLeft': -t * 610 + 'px'
        }, {
            queue: false,
            duration: 200
        });
        btnID.find('span').eq(t).addClass('on').siblings().removeClass('on');
        timeout = setInterval(function() {
            promoMove();
        }, 3000);

        btnID.find('span').each(function(index) {
            $(this).mouseover(function() {
                clearInterval(timeout);
                t = index;
                boxID.animate({
                    'marginLeft': -t * 610 + 'px'
                }, {
                    queue: false,
                    duration: 200
                });
                btnID.find('span').eq(t).addClass('on').siblings().removeClass('on');
                timeout = setInterval(function() {
                    promoMove();
                }, 3000);
            });
        });
        //����Ч��
        function promoMove() {
            t = parseInt(t + 1);
            if (t > ts) {
                t = 0;
            }
            if (t < 0) {
                t = ts;
            }
            p = t;
            boxID.animate({
                'marginLeft': -p * 610 + 'px'
            }, {
                queue: false,
                duration: 200
            });
            btnID.find('span').eq(p).addClass('on').siblings().removeClass('on');
        }
    }
};
milo.ready(function(){
    var versionLINK = $("#setNum").data('link'),
        versionNum = $("#setNum").data('num');
    $('#J_version em').html('Ver '+versionNum);
    $('#J_version .top-version-link').attr("href",versionLINK);
    include("http://lol.qq.com/v2/js/head.js", function() {
        LW201310_Userinfo.init();
    });
    $('.home-slide-item').eq(0).addClass('cur-slide').siblings().removeClass("cur-slide");
    $('.home-slide-item').eq(0).fadeIn(500).siblings().fadeOut(500);
    function setCookies (cookieName,value,num)
    {
        var exdate=new Date();
        exdate.setTime(exdate.getTime() + (num*60*1000));
        document.cookie = cookieName + "="+ value + "; expires="+exdate.toUTCString();
    }
    function getCookies(cookieName)
    {
        var arr = document.cookie.match(new RegExp("(^| )"+cookieName+"=([^;]*)(;|$)"));
        if(arr != null) return unescape(arr[2]); return null;
    }
    var viewFirst = false;

    $(window).scroll(function(){

        var bt = $(document).scrollTop();
        if(bt > 80) {
            if(getCookies("isFirstView")==null || !viewFirst){
                setCookies('isFirstView',"isFirstView",60);
                $('#header').addClass('header-close');
                //$('#header').animate({ height: '440px' }, 1000);
                //$('.header-inner').css({ height: '350px' }, 0);
                //$('.top-act').css({ height: '350px','padding-top':'40px' }, 0);
                //$('.top-big-video').fadeOut(1000);
                //$('.top-back-video').fadeIn(1000);
                //$('.top-act-desc').animate({ height: '30px','margin-bottom':'15px' }, 0);

                viewFirst = true;
            }
            if(bt > 440 && viewFirst){
                $('.menu').addClass('fix-menu');
            }
            else{
                $('.menu').removeClass('fix-menu');
            }
        }

    });
    //����ͳ��
    loadScript('http://tajs.qq.com/stats?sId=22024406',function(){
        loadScript("http://pingjs.qq.com/ping_tcss_ied.js",function(){
            if(typeof(pgvMain) == 'function'){pgvMain();}
        });
    });
    // setTimeout(function(){include('http://ossweb-img.qq.com/images/clientpop/js/gpmtips.js',function(){});},3000);
});

var TOOLS = {
		G_defer_cache_map : {},
		GetQueryString : function(name){
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	        var r = window.location.search.substring(1).match(reg);
	        if (r != null) return unescape(r[2]); return null;
	    },
		In_array : function(value, array) {
			for(var x in array) {
				if(value == array[x]) return true;
			}
			return false;
		},
		//��ʽ��ʱ��
		ReloadPubdate : function(string) {
			var re = /^(\d{2,4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
			if( re.test(string) ) {
				var t = string.match(re);
				var d = new Date(t[1], t[2]-1, t[3], t[4], t[5], t[6]);
				var c = new Date();
				var s = (c.getTime() - d.getTime())/1000;
				var m = Math.floor(s/60);
				var h = Math.floor(s/3600);
				var d = Math.floor(s/86400);
				var n = Math.floor(s/(86400*30));
				var y = Math.floor(s/(86400*365));
				if(y>0) return y+"����ǰ"; 
				if(n>0) return n+"������ǰ";
				if(d>0) return d+"����ǰ";
				if(h>0) return h+"Сʱ��ǰ";
				if(m>0) return m+"������ǰ";
			}
			return "�ո�";
		},
		//date ת str
		LinuxTimeToDate : function(day){
		    var Year = 0; 
		    var Month = 0; 
		    var Day = 0; 
		    var CurrentDate = ""; 
		    //��ʼ��ʱ�� 
		    //Year= day.getYear();//�л����2008����ʾ108��bug 
		    Year= day.getFullYear();//ie����¶����� 
		    Month= day.getMonth()+1; 
		    Day = day.getDate(); 
		    Hour = day.getHours(); 
		    Minute = day.getMinutes(); 
		    Second = day.getSeconds(); 
		    CurrentDate += Year + "-"; 
		    if (Month >= 10 ) { 
		        CurrentDate += Month + "-"; 
		    } 
		    else { 
		        CurrentDate += "0" + Month + "-"; 
		    } 
		    if (Day >= 10 ) { 
		        CurrentDate += Day ; 
		    }else { 
		        CurrentDate += "0" + Day ; 
		    }
		    if(Hour >=10 ){
		    	CurrentDate += " "+Hour ; 
		    }else{
		    	CurrentDate += " 0"+Hour ; 
		    }
		    if(Minute >=10 ){
		    	CurrentDate += ":"+Minute ; 
		    }else{
		    	CurrentDate += ":0"+Minute ; 
		    }
		    if(Second >=10 ){
		    	CurrentDate += ":"+Second ; 
		    }else{
		    	CurrentDate += ":0"+Second ; 
		    }
		    return CurrentDate; 
		},
		FormateMatchStatus : function(status){
			switch(status){
			case 1 :
				return "δ��ʼ";
			case 2 :
				return "������";
			case 3 :
				return "�ѽ���";
			}
		}
};/*  |xGv00|80f8545762074cb8b11895d6ebae3ecc */