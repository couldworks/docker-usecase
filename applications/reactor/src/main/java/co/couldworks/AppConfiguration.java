package co.couldworks;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

/**
 * Created by flavio on 11/07/16.
 */

@ComponentScan
@EnableAutoConfiguration
@PropertySource(Constants.Properties)
public class AppConfiguration {

}
