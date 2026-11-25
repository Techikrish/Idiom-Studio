import XCTest

/// Drop this file into a UI test target. It runs the platform accessibility audit
/// and keeps a launch screenshot as an artifact.
///
/// `performAccessibilityAudit` is available on iOS 17 and later.
final class IdiomAccessibilityTests: XCTestCase {
    func testAccessibilityAudit() throws {
        let app = XCUIApplication()
        app.launch()

        let screenshot = XCTAttachment(screenshot: app.screenshot())
        screenshot.name = "launch"
        screenshot.lifetime = .keepAlways
        add(screenshot)

        try app.performAccessibilityAudit(for: [
            .contrast,
            .hitRegion,
            .clippedText,
            .sufficientElementDescription,
            .dynamicType,
        ])
    }
}
