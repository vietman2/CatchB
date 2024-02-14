import { PostType } from "../types/community";

export const samplePosts: PostType[] = [
  {
    id: 1,
    title: "[오피셜] 다저스, 커쇼와 재계약 발표",
    body: `1년 계약 + 1년 선수옵션\n\n곤솔린 60일 IL행`,
    tags: ["MLB"],
    forum_id: 1,
    forum_name: "야구톡",
    userId: 1,
    author_name: "믈브팬",
    created_at: new Date().toISOString(),
    updated_at: "2024-02-13T12:30:01.010Z",
    num_comments: 1,
    num_likes: 1,
    num_clicks: 1,
  },
  {
    id: 2,
    title: "KBO 개막 D-200",
    body: "",
    tags: ["KBO"],
    forum_id: 1,
    forum_name: "야구톡",
    userId: 1,
    author_name: "크보팬",
    created_at: "2023-12-01T21:00:01.010Z",
    updated_at: "2024-02-02T21:00:01.010Z",
    num_comments: 1,
    num_likes: 1,
    num_clicks: 1,
  },
  {
    id: 3,
    title: "5월 15일 13시 목동야구장 용병",
    body: "5월 15일 경기 용병 구합니다.",
    tags: ["용병 모집"],
    forum_id: 2,
    forum_name: "모집",
    userId: 1,
    author_name: "작성자",
    created_at: "2024-02-21T12:00:01.010Z",
    updated_at: "2024-02-23T12:00:01.010Z",
    num_comments: 1,
    num_likes: 1,
    num_clicks: 165,
  },
  {
    id: 4,
    title: "5월 5일 성남 1부 경기",
    body: "5월 5일 성남 1부 경기 용병 구합니다.",
    tags: ["용병 모집"],
    forum_id: 2,
    forum_name: "모집",
    userId: 1,
    author_name: "사야감독",
    created_at: "2024-02-01T12:00:01.010Z",
    updated_at: "2024-02-01T12:00:01.010Z",
    num_comments: 2,
    num_likes: 0,
    num_clicks: 54,
  },
  {
    id: 5,
    title: "디 애슬레틱) 뉴욕 양키스 오프시즌 평가 : B",
    body: `오프시즌에 보강했어야 했던것들\n- 든든한 선발 - 모호함\n- 3루수 - X\n- 코너 외야수 - O\n- 중견수 - 모호함\n- 좌타자 - O
      \n\n2024 예상 페이롤 - 295m\n2023 페이롤 - 277.7m
      \n\n설명\n파드레스에서 후안 소토를 영입하며 이번 겨울에 할 수 있었던 최고의 결정을 내린 양키스입니다. 코너 외야수, 좌타자, 젊은 스타가 필요했는데 이 세 가지를 다 맞출 수 있는 최고의 옵션을 얻은 것이죠. 소토의 영입으로 양키스의 라인업은 완전히 달라졌습니다.
      \n그들의 다른 움직임도 성공적이었죠. 마커스 스트로먼은 예상보다 적은 금액에 영입했습니다. 트렌트 그리셤은 제대로 된 중견수가 필요한 팀에 좋은 영입이죠. 대규모 영입은 피했지만 불펜을 강화하기 위해 평소처럼 탄탄한 움직임을 보인 양키스입니다.
      \n그러나 저희 애슬레틱은 까다롭습니다. 버두고 트레이드도 소토가 합류한 이후에는 큰 의미가 없다고 생각합니다. 여전히 30대에 접어들은 선수들에 대한 의존도가 높기 때문이죠. 할 스타인브레너씨가 번트를 더 많이 해야한다고 지시라도 내린건가요? 이러면 A를 줄 수 없죠.
      \n\n주요 영입\n후안 소토, 마커스 스트로먼, 알렉스 버두고
      \n\n주요 방출\n마이클 킹, 아이재아 카이너 팔레파, 루이스 세베리노`,
    tags: ["MLB"],
    forum_id: 1,
    forum_name: "야구톡",
    userId: 1,
    author_name: "작성자",
    created_at: "2024-02-01T12:00:01.010Z",
    updated_at: "2024-02-02T12:00:01.010Z",
    num_comments: 12,
    num_likes: 134,
    num_clicks: 1287,
  },
  {
    id: 6,
    title: "단독) 클린스만 비밀리에 미국 출국",
    body: `https://n.news.naver.com/sports/kfootball/article/109/0005016053\n
      \n축구계 소식통은 10일 "클린스만 감독이 가족이 있는 미국으로 출국했다. 현재 카타르 아시안컵을 마친 뒤 국내로 복귀해 선수단과 마무리를 가졌고 일단 짧은 시간이지만 미국으로 출국했다. 복귀 일정에 대해서는 정확하게 결정되지 않았지만 긴 여정은 아니다"라고 밝혔다.`,
    tags: ["축구"],
    forum_id: 1,
    forum_name: "축구팬",
    userId: 1,
    author_name: "작성자",
    created_at: "2024-02-01T12:00:01.010Z",
    updated_at: "2024-02-02T12:00:01.010Z",
    num_comments: 12,
    num_likes: 134,
    num_clicks: 1287,
  },
  {
    id: 7,
    title: `"본인들이 KIA 감독 후보인걸 모른다" 후보는 추려졌다, 타이거즈색 고집 없다`,
    body: 'KIA 심재학 단장은 5일 스포츠조선과의 통화에서 "후보군을 폭넓게 1차적으로 추렸다. 그리고 그 후보군 중에서 다시 한번 재리스트업을 했다. 재리스트업 한 대상 후보들 중에 구단 내에서 최종 논의 중인 상황"이라고 현재 상황을 전했다. 최준영 대표이사와 심재학 단장, 그리고 프런트 팀장급 인사들이 의견을 모아 대략적인 후보를 선정했다.\n아직 최종 단계에 진입하기까지는 결정 과정이 조금 더필요하다. 내부적으로 치열한 검토 끝에 후보들이 선정되면, 모기업과의 상의를 통해 최종 후보가 가려진다. 최종 후보는 대개 2~4명 내다. 최종 후보들은 면접 대상자가 된다. 면접까지 치른 후 다시 종합적으로 검토해 감독 선임 작업이 완료된다.\n인터뷰와 면접을 언제, 어떤 식으로 진행할지는 아직 정해지지 않았다. 대신 모든 것을 철저히 보안 속에서 진행하고 있다. 대략적인 후보조차 정확히 알려지지 않은 이유다.\n코칭스태프, 선수단 구성 조각이 끝난 상태에서 감독만 교체하는 것이라 어려움이 있다. 보통 신임 감독이 부임하면, 선수단 파악만 하는데도 수개월이 소요된다. 때문에 타이거즈 출신 야구인, 과거 KIA 사령탑 출신, 현재 KIA 내부에 있는 코치 중 일부가 유력 후보로 실명이 거론되고 있다. 폭넓은 범위의 후보군에서는 외부의 예측이 상당 부분 맞아떨어지겠지만, 압축된 최종 후보로도 이름을 올릴 수는 아직 확답이 어렵다.\n심재학 단장은 "기존에 만들어진 틀에 들어오셔야 하다보니 구단의 방향성을 잘 이해해줄 수 있는 감독이 필요하다. 현재 우리 구단이 신경 써서 단계별로 시스템화 시키고 있는데, 이런 방향을 같이 갈 수 있는 감독이었으면 좋겠다. 선수들과의 관계도 고려하고 있다"면서도 "그렇다고 해서 이게 대단히 특별한 것은 아니다. 시스템화 갖춰가는 것은 우리 구단 뿐만 아니라 다른 구단도 마찬가지다. 그런 시스템 자체를 이해하실 수 있는 분이라는 게 첫번째 조건"이라고 밝혔다.\n쉽게 말해 무조건 타이거즈 출신, KIA 출신, 호남 출신에만 얽매이지 않고 더 넓은 시야에서 후보를 추렸다는 뜻이다.\n감독 선임 작업이 언제 완료될지 아직 확답을 할 수 없다. 당장 이번 주말 설 연휴가 문제다. 연휴가 끼어있어 커뮤니케이션이 더뎌질 수밖에 없다. 일단 명절이 지난 후에 대략적인 윤곽이 드러날 것으로 예상된다. 현재 구단 내부에서 추린 감독 후보 당사자들조차, 아직은 자신이 KIA 차기 감독 후보라는 사실을 모르고 있다.\nKIA는 현재 심재학 단장과 프런트 관계자들이 호주 캠프에 가지 못하고 국내에 머물며 감독 선임 작업에 총력을 기울이고 있다. 조심스럽지만, 소극적일 수는 없는 중대한 업무. 왕관의 무게를 견딜 수 있는 차기 사령탑 부임이 빠른 시일 내에 이뤄지기를 바라고 있다.',
    tags: ["KIA"],
    forum_id: 1,
    forum_name: "야구톡",
    userId: 1,
    author_name: "작성자",
    created_at: "2024-02-01T12:00:01.010Z",
    updated_at: "2024-02-05T12:00:01.010Z",
    num_comments: 12,
    num_likes: 134,
    num_clicks: 1287,
  },
];
