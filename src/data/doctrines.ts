import { Doctrine } from '../types/content';

export const doctrines: Doctrine[] = [
  {
    id: 'doctrine_1',
    title: 'The Trinity',
    summary: 'The doctrine that God is one Being who exists eternally in three persons: Father, Son, and Holy Spirit.',
    biblicalDefinition: 'God eternally exists as three persons—Father, Son, and Holy Spirit—who are unified in one Being or essence. Each person is fully God, equal in power, glory, and attributes, yet they are not three gods but one God. The Trinity is a mystery beyond full human comprehension, yet clearly revealed in Scripture.',
    keyScriptures: [
      'Matthew 28:19 - "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit."',
      'John 1:1-18 - Establishes the deity of Christ (the Word) and His distinction from the Father.',
      '2 Corinthians 13:14 - "The grace of the Lord Jesus Christ and the love of God and the fellowship of the Holy Spirit be with you all."',
      "Genesis 1:26 - \"Then God said, 'Let us make man in our image, after our likeness.'\"",
      'Matthew 3:16-17 - At Jesus\' baptism, all three persons of the Trinity are present and distinct.'
    ],
    commonMisunderstandings: [
      'Modalism - The false teaching that God is one person who appears in different "modes" at different times (Father, then Son, then Spirit) rather than three eternal persons.',
      'Arianism - The heresy claiming Jesus was created by God and not eternal or fully divine.',
      'Tritheism - The error of treating the three persons as three separate gods rather than one being.',
      'Subordinationism - The incorrect view that the Son and Spirit are eternally subordinate in nature or essence to the Father, rather than equal in divinity.'
    ],
    category: 'Theology Proper'
  },
  {
    id: 'doctrine_2',
    title: 'Justification by Faith',
    summary: 'The doctrine that sinners are declared righteous before God solely through faith in Jesus Christ, apart from works.',
    biblicalDefinition: 'Justification is God\'s legal declaration that a sinner is righteous in His sight, based not on the sinner\'s own merit but entirely on Christ\'s perfect righteousness imputed to them through faith. It is a one-time act of God\'s free grace wherein He pardons sin and accepts us as righteous solely because of Christ\'s work on our behalf.',
    keyScriptures: [
      'Romans 3:23-24 - "For all have sinned and fall short of the glory of God, and are justified by his grace as a gift, through the redemption that is in Christ Jesus."',
      'Galatians 2:16 - "Yet we know that a person is not justified by works of the law but through faith in Jesus Christ."',
      'Romans 5:1 - "Therefore, since we have been justified by faith, we have peace with God through our Lord Jesus Christ."',
      'Ephesians 2:8-9 - "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast."',
      'Philippians 3:9 - "...not having a righteousness of my own that comes from the law, but that which comes through faith in Christ, the righteousness from God that depends on faith."'
    ],
    commonMisunderstandings: [
      'That justification can be earned through good works or religious observance.',
      'That justification is simply God overlooking our sins rather than declaring us righteous based on Christ\'s imputed righteousness.',
      'That justification is the same as sanctification (the ongoing process of becoming holy).',
      'That justification means we will never sin again or that the Christian life doesn\'t require ongoing repentance.'
    ],
    category: 'Soteriology'
  },
  {
    id: 'doctrine_3',
    title: 'The Authority of Scripture',
    summary: 'The doctrine that the Bible is God\'s infallible and authoritative revelation, the final standard for faith and practice.',
    biblicalDefinition: 'Scripture is God-breathed (inspired), without error in the original manuscripts (infallible and inerrant), and the final authority for all matters of faith and practice. The Bible is not merely a human book but God\'s very words communicated through human authors, making it entirely trustworthy and authoritative for all believers.',
    keyScriptures: [
      '2 Timothy 3:16-17 - "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work."',
      '2 Peter 1:20-21 - "No prophecy of Scripture comes from someone\'s own interpretation. For no prophecy was ever produced by the will of man, but men spoke from God as they were carried along by the Holy Spirit."',
      'Psalm 19:7 - "The law of the LORD is perfect, reviving the soul; the testimony of the LORD is sure, making wise the simple."',
      'Matthew 5:18 - "For truly, I say to you, until heaven and earth pass away, not an iota, not a dot, will pass from the Law until all is accomplished."',
      'Isaiah 40:8 - "The grass withers, the flower fades, but the word of our God will stand forever."'
    ],
    commonMisunderstandings: [
      'That the Bible contains God\'s Word but is not entirely God\'s Word (partial inspiration).',
      'That the Bible is only inspired in matters of faith and not in historical, scientific, or other claims.',
      'That the church or individual spiritual experiences have equal or greater authority than Scripture.',
      'That the Bible can be perfectly understood apart from the illumination of the Holy Spirit or without considering historical and literary context.'
    ],
    category: 'Bibliology'
  },
  {
    id: 'doctrine_4',
    title: 'The Incarnation',
    summary: 'The doctrine that the eternal Son of God took on human nature and became man in the person of Jesus Christ.',
    biblicalDefinition: 'In the incarnation, the eternal Son of God, the second person of the Trinity, without ceasing to be fully God, took upon Himself a complete human nature (body, soul, and spirit) and became truly man in the person of Jesus Christ. Jesus is therefore fully God and fully man in one person, uniting two natures without confusion, change, division, or separation.',
    keyScriptures: [
      'John 1:14 - "And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth."',
      'Philippians 2:5-8 - "Christ Jesus, who, though he was in the form of God...emptied himself, by taking the form of a servant, being born in the likeness of men."',
      'Colossians 2:9 - "For in him the whole fullness of deity dwells bodily."',
      'Hebrews 2:14-17 - Explains how Jesus "partook of" our humanity to save us.',
      '1 John 4:2-3 - "Every spirit that confesses that Jesus Christ has come in the flesh is from God."'
    ],
    commonMisunderstandings: [
      'Docetism - The heresy claiming Jesus only appeared to be human but wasn\'t truly flesh and blood.',
      'Nestorianism - The error of treating Christ as two separate persons (divine and human) rather than one person with two natures.',
      'Monophysitism - The heresy claiming Christ had only one nature that was a mixture of divine and human.',
      'Adoptionism - The false teaching that Jesus was merely human and was "adopted" as God\'s Son at His baptism or resurrection.'
    ],
    category: 'Christology'
  },
  {
    id: 'doctrine_5',
    title: 'Sanctification',
    summary: 'The progressive work of God and man that makes us more and more free from sin and like Christ in our actual lives.',
    biblicalDefinition: 'Sanctification is the ongoing work of God in the life of the believer, making the Christian increasingly free from sin and increasingly like Christ in actual character and actions. Unlike justification (which happens once), sanctification is a progressive lifelong process in which the Holy Spirit works in believers as they actively participate through spiritual disciplines, obedience, and putting sin to death.',
    keyScriptures: [
      '1 Thessalonians 4:3 - "For this is the will of God, your sanctification."',
      'Romans 8:13 - "For if you live according to the flesh you will die, but if by the Spirit you put to death the deeds of the body, you will live."',
      '2 Corinthians 3:18 - "And we all, with unveiled face, beholding the glory of the Lord, are being transformed into the same image from one degree of glory to another."',
      'Philippians 2:12-13 - "Work out your own salvation with fear and trembling, for it is God who works in you, both to will and to work for his good pleasure."',
      'Romans 6:22 - "But now that you have been set free from sin and have become slaves of God, the fruit you get leads to sanctification and its end, eternal life."'
    ],
    commonMisunderstandings: [
      'Perfectionism - The false teaching that Christians can achieve sinless perfection in this life.',
      'Antinomianism - The error claiming Christians are free from moral law and don\'t need to strive for holiness.',
      'Legalism - The error of reducing sanctification to external rule-following rather than heart transformation.',
      'Passivism - The misconception that sanctification is entirely God\'s work with no human responsibility ("let go and let God").'
    ],
    category: 'Soteriology'
  }
];