import React from 'react'

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
              Mentions Légales
            </h1>
            <div className="w-24 h-1 mx-auto" style={{backgroundColor: '#12255D'}}></div>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            
            {/* Informations légales */}
            <section className="mb-12">
              <p className="text-gray-700 leading-relaxed mb-8">
                Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du Site l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
              </p>
              
              {/* Édition du site */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                  Édition du site
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">
                    Le site urgence-oqtf.fr est édité par la société <strong>EXILAE</strong>, au capital social de 2.000 € euros, immatriculée au Registre du commerce et des sociétés de Paris sous le n° 839 467 628 et dont le siège social est situé 94, boulevard Flandrin 75116, Paris (Siret n° 83946762800054).
                  </p>
                </div>
              </div>

              {/* Responsable de publication */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                  Responsable de publication
                </h2>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">
                    Monsieur <strong>Grégoire HERVET</strong>, Avocat au Barreau de Paris, Président de la Société EXILAE.
                  </p>
                </div>
              </div>

              {/* Hébergeur */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                  Hébergeur
                </h2>
                <div className="bg-red-50 p-6 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">
                    Le site urgence-oqtf.fr est hébergé par Supabase, société française. Le stockage des données personnelles des utilisateurs est exclusivement réalisé par Supabase, société française, sur des centres de données localisés dans des États membres de l'Union Européenne.
                  </p>
                </div>
              </div>

              {/* Nous contacter */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                  Nous contacter
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-red-50 p-6 rounded-xl">
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Par téléphone :</strong> 01 84 74 87 20</li>
                    <li><strong>Par email :</strong> contact@urgence-oqtf.fr</li>
                    <li><strong>Par courrier :</strong> Urgence-oqtf.fr Chez EXILAE Avocats 94 boulevard Flandrin 75116 Paris</li>
                  </ul>
                </div>
              </div>

              {/* Votre vie privée */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                  Votre vie privée
                </h2>
                <div className="bg-green-50 p-6 rounded-xl">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 (« RGPD »).
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Pour toute question concernant vos données personnelles ou si vous souhaitez supprimer votre Compte, merci de nous contacter à l'adresse suivante: Exilae Avocats 94 boulevard Flandrin 75116 Paris (en indiquant « Vie Privée – Protection des Données ») ou par email à contact@urgence-oqtf.fr
                  </p>
                </div>
              </div>
            </section>

            {/* Conditions générales */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                CONDITIONS GÉNÉRALES D'UTILISATION
              </h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  L'utilisation du site web www.exilae.fr (le « Site ») implique l'acceptation pleine et entière des conditions générales d'utilisation ci-après décrites.
                </p>
                
                <p>
                  Le Site est mis à jour régulièrement par EXILAE AVOCATS. De la même façon, les mentions légales peuvent être modifiées à tout moment : elles s'imposent néanmoins à l'utilisateur qui est invité à s'y référer le plus souvent possible afin d'en prendre connaissance.
                </p>
                
                <p>
                  Ce Site est normalement accessible à tout moment aux utilisateurs. Toutefois, EXILAE AVOCATS ne garantit pas que le Site sera accessible ou disponible de manière continue, ni qu'il sera exempt de virus. Une interruption pour raison de maintenance technique pourra par exemple être décidée par EXILAE AVOCATS, qui s'efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l'intervention.
                </p>
                
                <p>
                  L'utilisateur s'engage expressément à ce que l'utilisation faite du Site ne porte en aucun cas atteinte aux droits de EXILAE AVOCATS, et notamment à ce que cette utilisation ne constitue pas une contrefaçon ou une concurrence déloyale ou parasitaire.
                </p>
              </div>
            </section>

            {/* Description des services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                DESCRIPTION DES SERVICES FOURNIS
              </h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Le Site a pour seul et unique objet de fournir des informations concernant EXILAE AVOCATS et l'ensemble de ses activités. Il est réservé à l'usage personnel et privé de chaque utilisateur.
                </p>
                
                <p>
                  EXILAE AVOCATS s'efforce de fournir sur le Site des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                </p>
                
                <p>
                  Toutes les données, informations et documents fournis sur le Site sont donnés à titre indicatif. Ils ne sont ni exhaustifs ni complets et sont susceptibles d'évoluer à tout moment. Ils ne peuvent en aucun cas être considérés comme constituant un acte de conseil juridique, un démarchage, une sollicitation et/ou une offre de services. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne. La consultation du Site n'implique aucunement la création d'une relation d'affaires ou la fourniture d'un service juridique entre l'utilisateur et EXILAE AVOCATS.
                </p>
              </div>
            </section>


            {/* Propriété intellectuelle */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                PROPRIÉTÉ INTELLECTUELLE ET CONTREFAÇONS
              </h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  EXILAE AVOCATS est propriétaire des droits de propriété intellectuelle ou détient les droits d'usage sur tous les éléments accessibles sur le Site, notamment les textes, images, graphismes, logo, icônes, sons, et/ou logiciels.
                </p>
                
                <p>
                  Toute reproduction, représentation, modification, publication, traduction, et/ou adaptation de tout ou partie des éléments du Site, à titre onéreux ou gratuit, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de EXILAE AVOCATS.
                </p>
                
                <p>
                  Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
                </p>
              </div>
            </section>

            {/* Limitations de responsabilité */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                LIMITATIONS DE RESPONSABILITÉ
              </h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  EXILAE AVOCATS ne pourra être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur, lors de l'accès au Site, et/ou résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées ci-dessus, soit de l'apparition d'un bug ou d'une incompatibilité.
                </p>
                
                <p>
                  EXILAE AVOCATS ne pourra pas non plus être tenu responsable des dommages indirects (tels par exemple qu'une perte de marché ou perte d'une chance) consécutifs à l'utilisation du Site. EXILAE AVOCATS ne sera pas non plus responsable des dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations diffusées sur le Site.
                </p>
                
                <p>
                  Des espaces interactifs (ex.: possibilité de poser des questions dans l'espace Contact) sont à la disposition des utilisateurs. EXILAE AVOCATS procède à un contrôle préalable de tout contenu publié sur le Site et se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données. Le cas échéant, EXILAE AVOCATS se réserve également la possibilité de mettre en cause la responsabilité civile et/ou pénale de l'utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie…).
                </p>
              </div>
            </section>

            {/* Liens et cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                LIENS HYPERTEXTES ET COOKIES
              </h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Le Site pourra contenir un certain nombre de liens hypertextes vers d'autres sites, mis en place après vérification et autorisation de EXILAE AVOCATS.
                </p>
                
                <p>
                  Le Cabinet s'efforce de s'assurer que les liens en question ne permettent pas d'accéder directement ou indirectement à des sites ou à des pages de sites dont le contenu serait contraire à la législation française et aux principes essentiels de la profession d'avocat.
                </p>
                
                <p>
                  La navigation sur le Site est susceptible de provoquer l'installation de cookie(s) sur le terminal de l'utilisateur. Un cookie est un fichier de petite taille, qui ne permet pas l'identification de l'utilisateur, mais qui enregistre des informations relatives à la navigation d'un ordinateur sur un site. Les données ainsi obtenues visent à faciliter la navigation ultérieure sur le Site, et ont également vocation à permettre diverses mesures de fréquentation.
                </p>
                
                <p>
                  Pour plus de détails, vous pouvez consulter notre Politique de Confidentialité.
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                DROIT APPLICABLE ET ATTRIBUTION DE JURIDICTION
              </h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Tout litige en relation avec l'utilisation du Site est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
                </p>
                
                <p>
                  Conformément aux dispositions des articles L.612-1 et suivants du Code de la consommation, toute personne n'agissant pas en qualité de professionnel peut, en cas de litige, recourir gratuitement au Médiateur de la consommation auprès du Conseil National des Barreaux (« CNB ») dont les coordonnées sont les suivantes : CNB, Médiateur de la consommation, 180 boulevard Haussmann – 75008 PARIS.
                </p>
              </div>
            </section>

            {/* Design et développement */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                Design & Développement
              </h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-red-50 p-6 rounded-xl">
                <p className="text-gray-700 text-center font-medium">
                  Le site Internet a été conçu et développé par l'agence <strong style={{color: '#12255D'}}>REBUILD</strong>
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
