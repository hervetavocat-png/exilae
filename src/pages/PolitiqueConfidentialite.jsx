import React from 'react'

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
              Politique de Confidentialité
            </h1>
            <div className="w-24 h-1 mx-auto" style={{backgroundColor: '#12255D'}}></div>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            
            {/* Article 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                ARTICLE 1 : PRÉAMBULE
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                La présente politique de confidentialité a pour but d'informer les utilisateurs du site urgence-oqtf.fr :
              </p>
              
              <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed mb-6">
                <li>Sur la manière dont sont collectées leurs données personnelles. Sont considérées comme des données personnelles, toute information permettant d'identifier un utilisateur. A ce titre, il peut s'agir : de ses noms et prénoms, de son âge, de son adresse postale ou email, de sa localisation ou encore de son adresse IP (liste non-exhaustive) ;</li>
                <li>Sur les droits dont ils disposent concernant ces données ;</li>
                <li>Sur la personne responsable du traitement des données à caractère personnel collectées et traitées ;</li>
                <li>Sur les destinataires de ces données personnelles ;</li>
                <li>Sur la politique du site en matière de cookies.</li>
              </ul>
              
              <p className="text-gray-700 leading-relaxed">
                Cette politique complète les mentions légales consultables par les utilisateurs à l'adresse suivante.
              </p>
            </section>

            {/* Article 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                ARTICLE 2 : PRINCIPES RELATIFS À LA COLLECTE ET AU TRAITEMENT DES DONNÉES PERSONNELLES
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Conformément à l'article 5 du Règlement européen 2016/679, les données à caractère personnel sont :
              </p>
              
              <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed mb-6">
                <li>Traitées de manière licite, loyale et transparente au regard de la personne concernée ;</li>
                <li>Collectées pour des finalités déterminées (cf. Article 3.1 des présentes), explicites et légitimes, et ne pas être traitées ultérieurement d'une manière incompatible avec ces finalités ;</li>
                <li>Adéquates, pertinentes et limitées à ce qui est nécessaire au regard des finalités pour lesquelles elles sont traitées ;</li>
                <li>Exactes et, si nécessaire, tenues à jour. Toutes les mesures raisonnables doivent être prises pour que les données à caractère personnel qui sont inexactes, eu égard aux finalités pour lesquelles elles sont traitées, soient effacées ou rectifiées sans tarder ;</li>
                <li>Conservées sous une forme permettant l'identification des personnes concernées pendant une durée n'excédant pas celle nécessaire au regard des finalités pour lesquelles elles sont traitées ;</li>
                <li>Traitées de façon à garantir une sécurité appropriée des données collectées, y compris la protection contre le traitement non autorisé ou illicite et contre la perte, la destruction ou les dégâts d'origine accidentelle, à l'aide de mesures techniques ou organisationnelles appropriées.</li>
              </ul>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Le traitement n'est licite que si, et dans la mesure où, au moins une des conditions suivantes est remplie :
              </p>
              
              <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
                <li>La personne concernée a consenti au traitement de ses données à caractère personnel pour une ou plusieurs finalités spécifiques ;</li>
                <li>Le traitement est nécessaire à l'exécution d'un contrat auquel la personne concernée est partie ou à l'exécution de mesures précontractuelles prises à la demande de celle-ci ;</li>
                <li>Le traitement est nécessaire au respect d'une obligation légale à laquelle le responsable du traitement est soumis ;</li>
                <li>Le traitement est nécessaire à la sauvegarde des intérêts vitaux de la personne concernée ou d'une autre personne physique ;</li>
                <li>Le traitement est nécessaire à l'exécution d'une mission d'intérêt public ou relevant de l'exercice de l'autorité publique dont est investi le responsable du traitement ;</li>
                <li>Le traitement est nécessaire aux fins des intérêts légitimes poursuivis par le responsable du traitement ou par un tiers, à moins que ne prévalent les intérêts ou les libertés et droits fondamentaux de la personne concernée qui exigent une protection des données à caractère personnel, notamment lorsque la personne concernée est un enfant.</li>
              </ul>
            </section>

            {/* Article 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                ARTICLE 3 : DONNÉES À CARACTÈRE PERSONNEL COLLECTÉES ET TRAITÉES DANS LE CADRE DE LA NAVIGATION SUR LE SITE
              </h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4" style={{color: '#12255D'}}>Article 3.1 : Données collectées</h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Les données personnelles collectées dans le cadre de notre activité sont les suivantes :
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Nom</li>
                  <li>Prénom</li>
                  <li>Adresse</li>
                  <li>Numéro de téléphone</li>
                  <li>Email</li>
                  <li>Documents administratifs</li>
                </ul>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  La collecte et le traitement de ces données répond à la (aux) finalité(s) suivante(s) :
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Traitement des dossiers</li>
                  <li>Gestion de la clientèle</li>
                  <li>Suivi des dossiers</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4" style={{color: '#12255D'}}>Article 3.2 : Mode de collecte des données</h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Lorsque vous utilisez notre site, sont automatiquement collectées les données suivantes :
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Adresse IP</li>
                </ul>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  D'autres données personnelles sont collectées lorsque vous effectuez les opérations suivantes sur la plateforme :
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                  <li>Nom</li>
                  <li>Prénom</li>
                  <li>Adresse</li>
                  <li>Numéro de téléphone</li>
                  <li>Email</li>
                  <li>Documents administratifs</li>
                </ul>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Elles sont conservées par le responsable du traitement dans des conditions raisonnables de sécurité, pour une durée de : <strong>3 ans</strong>.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  La société est susceptible de conserver certaines données à caractère personnel au-delà des délais annoncés ci-dessus afin de remplir ses obligations légales ou réglementaires.
                </p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4" style={{color: '#12255D'}}>Article 3.3 : Hébergement des données</h3>
                
                <p className="text-gray-700 leading-relaxed">
                  Le site urgence-oqtf.fr est hébergé par Supabase, société française. Le stockage des données personnelles des utilisateurs est exclusivement réalisé par Supabase, société française, sur des centres de données localisés dans des États membres de l'Union Européenne.
                </p>
              </div>
            </section>

            {/* Article 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                ARTICLE 4 : RESPONSABLE DU TRAITEMENT DES DONNÉES ET DÉLÉGUÉ À LA PROTECTION DES DONNÉES
              </h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4" style={{color: '#12255D'}}>Article 4.1 : Le responsable du traitement des données</h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Les données à caractère personnelles sont collectées par la Société EXILAE Avocats, SASU au capital de 2.000 euros, immatriculée au RCS de Paris sous le numéro 839 467 628, représentée par Maître Grégoire HERVET, avocat associé, en sa qualité de Président.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Le responsable du traitement des données à caractère personnel peut être contacté de la manière suivante :
                </p>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Par téléphone :</strong> 01 84 74 87 20</li>
                    <li><strong>Par email :</strong> contact@urgence-oqtf.fr</li>
                    <li><strong>Par courrier :</strong> Urgence-oqtf.fr Chez EXILAE Avocats 94 boulevard Flandrin 75116 Paris</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{color: '#12255D'}}>Article 4.2 : Le délégué à la protection des données</h3>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  Le délégué à la protection des données de l'entreprise ou du responsable est :
                </p>
                
                <div className="bg-blue-50 p-6 rounded-xl mb-4">
                  <p className="text-gray-700 font-semibold mb-3">Maître Grégoire HERVET</p>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Par téléphone :</strong> 01 84 74 87 20</li>
                    <li><strong>Par email :</strong> contact@urgence-oqtf.fr</li>
                    <li><strong>Par courrier :</strong> Urgence-oqtf.fr Chez EXILAE Avocats 94 boulevard Flandrin 75116 Paris</li>
                  </ul>
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                  Si vous estimez, après nous avoir contactés, que vos droits "Informatique et Libertés", ne sont pas respectés, vous pouvez adresser une information à la CNIL.
                </p>
              </div>
            </section>

            {/* Article 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                ARTICLE 5 : LES DROITS DE L'UTILISATEUR EN MATIÈRE DE COLLECTE ET DE TRAITEMENT DES DONNÉES
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Tout utilisateur concerné par le traitement de ses données personnelles peut se prévaloir des droits suivants, en application du règlement européen 2016/679 et de la Loi Informatique et Liberté (Loi 78-17 du 6 janvier 1978) :
              </p>
              
              <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed mb-6">
                <li>Droit d'accès, de rectification et droit à l'effacement des données (posés respectivement aux articles 15, 16 et 17 du RGPD) ;</li>
                <li>Droit à la portabilité des données (article 20 du RGPD) ;</li>
                <li>Droit à la limitation (article 18 du RGPD) et à l'opposition du traitement des données (article 21 du RGPD) ;</li>
                <li>Droit de ne pas faire l'objet d'une décision fondée exclusivement sur un procédé automatisé ;</li>
                <li>Droit de déterminer le sort des données après la mort ;</li>
                <li>Droit de saisir l'autorité de contrôle compétente (article 77 du RGPD).</li>
              </ul>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Pour exercer vos droits, veuillez adresser votre courrier à :
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-red-50 p-6 rounded-xl mb-6">
                <p className="text-gray-700 font-semibold mb-3">Maître Grégoire HERVET</p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Par téléphone :</strong> 01 84 74 87 20</li>
                  <li><strong>Par email :</strong> contact@urgence-oqtf.fr</li>
                  <li><strong>Par courrier :</strong> Urgence-oqtf.fr Chez EXILAE Avocats 94 boulevard Flandrin 75116 Paris</li>
                </ul>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                Afin que le responsable du traitement des données puisse faire droit à sa demande, l'utilisateur peut être tenu de lui communiquer certaines informations telles que : ses noms et prénoms, son adresse e-mail ainsi que son numéro de compte, d'espace personnel ou d'abonné. Consultez le site cnil.fr pour plus d'informations sur vos droits.
              </p>
            </section>

            {/* Article 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#12255D', fontFamily: 'Poppins, sans-serif'}}>
                ARTICLE 6 : CONDITIONS DE MODIFICATION DE LA POLITIQUE DE CONFIDENTIALITÉ
              </h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  L'éditeur du site urgence-oqtf.fr se réserve le droit de pouvoir modifier la présente Politique à tout moment afin d'assurer aux utilisateurs du site sa conformité avec le droit en vigueur.
                </p>
                
                <p>
                  Les éventuelles modifications ne sauraient avoir d'incidence sur les achats antérieurement effectués sur le site, lesquels restent soumis à la Politique en vigueur au moment de l'achat et telle qu'acceptée par l'utilisateur lors de la validation de l'achat.
                </p>
                
                <p>
                  L'utilisateur est invité à prendre connaissance de cette Politique à chaque fois qu'il utilise nos services, sans qu'il soit nécessaire de l'en prévenir formellement.
                </p>
                
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
