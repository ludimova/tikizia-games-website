from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRIVACY = ROOT / 'public' / 'privacy' / 'index.html'
TERMS = ROOT / 'public' / 'terms' / 'index.html'
COMMUNITY = ROOT / 'public' / 'community-guidelines' / 'index.html'


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{label}: expected 1 match, found {count}')
    return text.replace(old, new, 1)


def patch_privacy() -> None:
    text = PRIVACY.read_text(encoding='utf-8')
    text = text.replace('Last updated: August 26, 2026', 'Last updated: August 31, 2026')

    text = replace_once(
        text,
        '''        <li>Account identifiers</li>\n        <li>Authentication information provided by supported sign-in providers</li>''',
        '''        <li>Account identifiers</li>\n        <li>Date of birth and age-status declaration used to apply age-restricted features</li>\n        <li>Authentication information provided by supported sign-in providers</li>''',
        'privacy account age disclosure',
    )

    text = replace_once(
        text,
        '''        <li>Security and authentication events</li>''',
        '''        <li>Security and authentication events</li>\n        <li>Push-notification registration tokens and device identifiers needed to deliver app notifications</li>''',
        'privacy push token disclosure',
    )

    marker = '''      <h3>\n        Support communications\n      </h3>'''
    safety = '''      <h3>\n        Safety and moderation information\n      </h3>\n\n      <p>\n        When safety tools are used, we may store\n        limited information necessary to investigate\n        and respond to abuse, including:\n      </p>\n\n      <ul>\n        <li>Blocks between users</li>\n        <li>Reports and the reason selected by the reporter</li>\n        <li>Optional report details and references to the relevant connection, round, question or response</li>\n        <li>Safety holds or moderation status associated with a report</li>\n      </ul>\n\n      <p>\n        Safety records may be retained for a limited\n        period after an account is deleted when\n        reasonably necessary to investigate abuse,\n        prevent fraud, protect users, resolve disputes\n        or comply with legal obligations.\n      </p>\n\n'''
    if safety not in text:
        text = replace_once(text, marker, safety + marker, 'privacy safety section')

    PRIVACY.write_text(text, encoding='utf-8')


def patch_terms() -> None:
    text = TERMS.read_text(encoding='utf-8')
    text = text.replace('Last updated: August 26, 2026', 'Last updated: August 31, 2026')

    old = '''      <p>\n        We may restrict or terminate access\n        when necessary to protect users,\n        our services or our legal rights.\n      </p>'''
    new = '''      <p>\n        These rules are supplemented by the Tikizia Games\n        Community Guidelines. By using social or user-content\n        features, you also agree to follow those guidelines.\n      </p>\n\n      <p>\n        <a href="/community-guidelines/">\n          Read the Tikizia Games Community Guidelines\n        </a>\n      </p>\n\n      <p>\n        We may restrict or terminate access\n        when necessary to protect users,\n        our services or our legal rights.\n      </p>'''
    text = replace_once(text, old, new, 'terms community link')

    old2 = '''      <p>\n        You are responsible for ensuring that\n        content you submit does not violate\n        applicable law or the rights of others.\n      </p>'''
    new2 = '''      <p>\n        You are responsible for ensuring that\n        content you submit does not violate\n        applicable law, the rights of others,\n        these Terms or our Community Guidelines.\n      </p>\n\n      <p>\n        Conoche provides in-app blocking and reporting\n        tools. Reports may include references to the\n        relevant connection, round, question, custom\n        prompt or response so that a safety review can\n        evaluate the correct context.\n      </p>'''
    text = replace_once(text, old2, new2, 'terms UGC reporting language')

    TERMS.write_text(text, encoding='utf-8')


def write_community() -> None:
    COMMUNITY.parent.mkdir(parents=True, exist_ok=True)
    COMMUNITY.write_text('''<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Community Guidelines | Tikizia Games</title>\n  <meta name="description" content="Community Guidelines for Tikizia Games and Conoche.">\n  <style>\n    :root{--bg:#050505;--card:#101010;--text:#f5f5f5;--muted:#aaa;--orange:#ff6a00;--border:rgba(255,255,255,.09);--max:900px}\n    *{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font-family:Arial,sans-serif;line-height:1.7}a{color:var(--orange)}header{border-bottom:1px solid var(--border)}.bar,main{width:min(calc(100% - 40px),var(--max));margin:auto}.bar{min-height:72px;display:flex;align-items:center;justify-content:space-between}.brand{font-weight:900;color:var(--orange);text-decoration:none}main{padding:70px 0 100px}h1{font-size:clamp(2.7rem,8vw,5rem);line-height:1;margin:0 0 14px}h2{margin-top:42px}p,li{color:var(--muted)}.intro,.box{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:24px}.updated{color:var(--muted);margin-bottom:38px}footer{border-top:1px solid var(--border);padding:28px;text-align:center;color:#666}strong{color:var(--text)}\n  </style>\n</head>\n<body>\n<header><div class="bar"><a class="brand" href="/">TIKIZIA GAMES</a><a href="/">← Back to Tikizia Games</a></div></header>\n<main>\n  <h1>Community Guidelines</h1>\n  <p class="updated">Last updated: August 31, 2026</p>\n  <div class="intro">These guidelines apply to social and user-generated-content features in Tikizia Games products, including Conoche. They supplement our <a href="/terms/">Terms &amp; Conditions</a>.</div>\n\n  <h2>1. Respect and consent</h2>\n  <p>Use Conoche only with people who have chosen to connect with you. Respect boundaries, requests to stop, and a person's decision not to answer a question or continue an interaction.</p>\n\n  <h2>2. Prohibited behavior</h2>\n  <ul>\n    <li>Harassment, threats, intimidation, stalking or repeated unwanted contact.</li>\n    <li>Hate speech, slurs or degrading attacks based on protected characteristics.</li>\n    <li>Impersonation, fraud, scams or deliberately deceptive identity claims.</li>\n    <li>Sharing another person's private or identifying information without permission.</li>\n    <li>Sexual content involving minors, grooming, exploitation, coercion or non-consensual sexual content.</li>\n    <li>Using age-restricted features with or for a person who does not meet the required age.</li>\n    <li>Malicious links, malware, spam or attempts to compromise accounts or devices.</li>\n    <li>Content or conduct that violates applicable law or another person's rights.</li>\n  </ul>\n\n  <h2>3. User-generated content</h2>\n  <p>Answers, custom questions, profile information, photos and other content you submit remain your responsibility. Do not use user-generated-content features to evade these rules.</p>\n\n  <h2>4. Blocking and reporting</h2>\n  <p>Conoche provides tools to block another user and to report a connection or specific user-generated content. A content report may reference the relevant connection, game session, round, custom prompt or response so the correct context can be reviewed.</p>\n  <p>Blocking and reporting are different actions. Blocking restricts interaction. A report asks Tikizia Games to review a safety concern. A report does not automatically establish that a violation occurred.</p>\n\n  <h2>5. Enforcement</h2>\n  <p>Depending on the circumstances and available evidence, Tikizia Games may warn a user, restrict a feature, pause an interaction, suspend an account or terminate access. Serious safety risks may result in immediate action. Deliberate abuse of reporting tools may also lead to restrictions.</p>\n\n  <h2>6. Adult features</h2>\n  <p>Features marked 18+ are available only when the applicable age requirements are satisfied. Adult-only areas do not permit exploitative, coercive, illegal or otherwise prohibited sexual content.</p>\n\n  <h2>7. Safety and emergencies</h2>\n  <p>Conoche is not an emergency service. If you believe someone is in immediate danger, contact the appropriate local emergency service or other qualified resource.</p>\n\n  <div class="box">\n    <strong>Questions or safety concerns?</strong>\n    <p>Email <a href="mailto:support@tikiziagames.com">support@tikiziagames.com</a>.</p>\n    <p>Read our <a href="/privacy/">Privacy Policy</a> and <a href="/terms/">Terms &amp; Conditions</a>.</p>\n  </div>\n</main>\n<footer>© 2026 Tikizia Games · Made in Costa Rica 🇨🇷</footer>\n</body>\n</html>\n''', encoding='utf-8')


def main() -> None:
    patch_privacy()
    patch_terms()
    write_community()
    print('Hardened Conoche legal pages for Play review and UGC policy.')


if __name__ == '__main__':
    main()
